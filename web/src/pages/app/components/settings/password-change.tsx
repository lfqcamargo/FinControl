'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { changePassword } from '@/api/change-password'
import { useMutation } from '@tanstack/react-query'
import { ToastError } from '@/components/toast-error'
import axios from 'axios'

// Schema de validação
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Campo obrigatório'),
    newPassword: z
      .string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .max(20)
      .regex(/[A-Z]/, 'Deve conter uma letra maiúscula')
      .regex(/[a-z]/, 'Deve conter uma letra minúscula')
      .regex(/[0-9]/, 'Deve conter um número')
      .regex(/[^A-Za-z0-9]/, 'Deve conter um caractere especial'),
    confirmPassword: z.string().min(1, 'Campo obrigatório'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type PasswordForm = z.infer<typeof passwordSchema>

export function PasswordChange() {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  })

  const { mutateAsync: changePasswordFn } = useMutation({
    mutationFn: changePassword,
  })

  async function onSubmit(data: PasswordForm) {
    try {
      await changePasswordFn({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })

      toast.success('Senha atualizada com sucesso!')
      reset()
      setIsPasswordDialogOpen(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ToastError({ error })
      } else {
        toast.error('Erro ao atualizar a senha.')
      }
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Segurança</CardTitle>
          <CardDescription>
            Gerencie sua senha e segurança da conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Sua senha deve ter pelo menos 8 caracteres e incluir letras
              maiúsculas, minúsculas, números e caracteres especiais.
            </p>
            <Button onClick={() => setIsPasswordDialogOpen(true)}>
              Alterar senha
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Alterar Senha</DialogTitle>
            <DialogDescription>
              Crie uma nova senha para sua conta.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Senha atual</Label>
              <Input
                id="currentPassword"
                type="password"
                {...register('currentPassword')}
              />
              {errors.currentPassword && (
                <p className="min-h-[16px] pl-1 mb-2 text-sm text-destructive">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova senha</Label>
              <Input
                id="newPassword"
                type="password"
                {...register('newPassword')}
              />
              {errors.newPassword && (
                <p className="min-h-[16px] pl-1 mb-2 text-sm text-destructive">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="min-h-[16px] pl-1 mb-2 text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPasswordDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Atualizar senha'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
