import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBudget } from '@/api/create-budget'
import { ToastError } from '@/components/toast-error'
import { toast } from 'sonner'
import axios from 'axios'

const months = [
  { value: 1, label: 'Janeiro' },
  { value: 2, label: 'Fevereiro' },
  { value: 3, label: 'Março' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Maio' },
  { value: 6, label: 'Junho' },
  { value: 7, label: 'Julho' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Setembro' },
  { value: 10, label: 'Outubro' },
  { value: 11, label: 'Novembro' },
  { value: 12, label: 'Dezembro' },
]

const newBudgetSchema = z.object({
  title: z.string().min(1, 'A categoria é obrigatória'),
  value: z.coerce.number().gt(0, 'O valor deve ser maior que 0'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor inválida'),
  month: z.coerce.number().min(1, 'Mês inválido').max(12, 'Mês inválido'),
  year: z.coerce.number().min(2000, 'Ano inválido').max(2100, 'Ano inválido'),
})

type NewBudgetFormData = z.infer<typeof newBudgetSchema>

interface NewBudgetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewBudget({ open, onOpenChange }: NewBudgetProps) {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    watch,
  } = useForm<NewBudgetFormData>({
    resolver: zodResolver(newBudgetSchema),
    defaultValues: {
      color: '#000000',
    },
  })

  const titleWatch = watch('title')
  const monthWatch = watch('month')
  const yearWatch = watch('year')
  const valueWatch = watch('value')

  let activeButton = false
  if (!titleWatch || !monthWatch || !yearWatch || !valueWatch) {
    activeButton = false
  } else {
    activeButton = true
  }

  const { mutateAsync: createBudgetFn } = useMutation({
    mutationFn: createBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
  })

  async function handleCreateBudget(data: NewBudgetFormData) {
    const date = new Date(data.year, data.month - 1, 1)
    try {
      await createBudgetFn({
        title: data.title,
        date: date,
        value: data.value,
        color: data.color,
      })
      reset({
        color: '#000000',
      })
      onOpenChange(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ToastError({ error })
      } else {
        toast.error('Erro interno.')
      }
    }
  }

  function handleCloseBudget() {
    reset({
      color: '#000000',
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Novo Orçamento</DialogTitle>
          <DialogDescription>
            Adicione um novo orçamento para uma categoria.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={handleSubmit(handleCreateBudget)}
        >
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" {...register('title')} />

            <p className="min-h-[14px] pl-1 mb-2 text-sm text-destructive">
              {errors.title?.message}
            </p>
          </div>

          <Controller
            name="month"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <Label htmlFor="month">Mês</Label>
                <Select
                  value={String(field.value ?? '')}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger id="month">
                    <SelectValue placeholder="Selecione o mês" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem
                        className="hover:bg-gray-100"
                        key={month.value}
                        value={String(month.value)}
                      >
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <p className="min-h-[14px] pl-1 mb-2 text-sm text-destructive">
                  {errors.month?.message && 'Mês inválido'}
                </p>
              </div>
            )}
          />

          <div className="space-y-2">
            <Label htmlFor="year">Ano</Label>
            <Input
              id="year"
              type="number"
              min="2000"
              max="2100"
              {...register('year')}
            />

            <p className="min-h-[14px] pl-1 mb-2 text-sm text-destructive">
              {errors.year?.message}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Valor (R$)</Label>
            <Input
              id="value"
              type="number"
              step="100.00"
              placeholder="0,00"
              {...register('value', {
                valueAsNumber: true,
                onBlur: (e) => {
                  const value = parseFloat(e.target.value)
                  if (!isNaN(value)) {
                    e.target.value = value.toFixed(2)
                  }
                },
              })}
            />
            <p className="min-h-[14px] pl-1 mb-2 text-sm text-destructive">
              {errors.value?.message}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Cor</Label>
            <Input
              id="color"
              type="color"
              {...register('color')}
              className="w-16 h-10 p-1 border rounded"
            />
            {errors.color && (
              <p className="min-h-[14px] pl-1 mb-2 text-sm text-destructive">
                {errors.color.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCloseBudget}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting || !activeButton}>
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
