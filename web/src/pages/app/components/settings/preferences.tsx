'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getPreferences } from '@/api/get-preferences'
import { savePreferences } from '@/api/save-preferences'
import { toast } from 'sonner'
import { ToastError } from '@/components/toast-error'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

const preferencesSchema = z.object({
  notificationPhone: z.boolean(),
  notificationEmail: z.boolean(),
  notificationBudgets: z.boolean(),
  notificationReports: z.boolean(),
})

type PreferenceForm = z.infer<typeof preferencesSchema>

export function Preferences() {
  const [isPreferencesSaved, setIsPreferencesSaved] = useState(false)

  // Query para buscar as preferências
  const { data: preferencesData, isLoading: isLoadingPreferences } = useQuery({
    queryKey: ['preferences'],
    queryFn: getPreferences,
  })

  // Mutation para salvar as preferências
  const { mutateAsync: savePreferencesFn } = useMutation({
    mutationFn: savePreferences,
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<PreferenceForm>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      notificationPhone:
        preferencesData?.preferences.notificationPhone || false,
      notificationEmail:
        preferencesData?.preferences.notificationEmail || false,
      notificationBudgets:
        preferencesData?.preferences.notificationBudgets || false,
      notificationReports:
        preferencesData?.preferences.notificationReports || false,
    },
  })

  // Observar mudanças nos campos
  const watchedValues = watch()

  // Carregar dados quando a query retornar
  useEffect(() => {
    if (preferencesData?.preferences) {
      const { preferences } = preferencesData
      reset({
        notificationPhone: preferences.notificationPhone,
        notificationEmail: preferences.notificationEmail,
        notificationBudgets: preferences.notificationBudgets,
        notificationReports: preferences.notificationReports,
      })
    }
  }, [preferencesData, reset])

  async function handleSavePreferences(data: PreferenceForm) {
    try {
      await savePreferencesFn(data)

      setIsPreferencesSaved(true)
      setTimeout(() => setIsPreferencesSaved(false), 3000)

      toast.success('Preferências salvas com sucesso!')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ToastError({ error })
      } else {
        toast.error('Ocorreu um erro inesperado.')
      }
    }
  }

  if (isLoadingPreferences) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Preferências</CardTitle>
          <CardDescription>
            Personalize sua experiência no aplicativo
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">
              Carregando preferências...
            </span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferências</CardTitle>
        <CardDescription>
          Personalize sua experiência no aplicativo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(handleSavePreferences)}
          className="space-y-4"
        >
          <div className="flex items-start space-x-3">
            <Checkbox
              id="notificationPhone"
              checked={watchedValues.notificationPhone}
              onCheckedChange={(checked) =>
                setValue('notificationPhone', checked as boolean)
              }
              {...register('notificationPhone')}
            />
            <div className="space-y-1 leading-none">
              <Label htmlFor="notificationPhone">
                Notificações por telefone
              </Label>
              <p className="text-sm text-muted-foreground">
                Receba notificações no seu telefone
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="notificationEmail"
              checked={watchedValues.notificationEmail}
              onCheckedChange={(checked) =>
                setValue('notificationEmail', checked as boolean)
              }
              {...register('notificationEmail')}
            />
            <div className="space-y-1 leading-none">
              <Label htmlFor="notificationEmail">Notificações por e-mail</Label>
              <p className="text-sm text-muted-foreground">
                Receba notificações no seu e-mail
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="notificationBudgets"
              checked={watchedValues.notificationBudgets}
              onCheckedChange={(checked) =>
                setValue('notificationBudgets', checked as boolean)
              }
              {...register('notificationBudgets')}
            />
            <div className="space-y-1 leading-none">
              <Label htmlFor="notificationBudgets">
                Notificações de orçamentos
              </Label>
              <p className="text-sm text-muted-foreground">
                Receba notificações quando atingir limites de orçamento
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="notificationReports"
              checked={watchedValues.notificationReports}
              onCheckedChange={(checked) =>
                setValue('notificationReports', checked as boolean)
              }
              {...register('notificationReports')}
            />
            <div className="space-y-1 leading-none">
              <Label htmlFor="notificationReports">
                Notificações de relatórios
              </Label>
              <p className="text-sm text-muted-foreground">
                Receba relatórios mensais por e-mail
              </p>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : isPreferencesSaved ? (
              'Salvo com sucesso!'
            ) : (
              'Salvar preferências'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
