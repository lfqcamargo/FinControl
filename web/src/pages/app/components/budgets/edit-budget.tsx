import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { editBudget } from '@/api/edit-budget'
import { queryClient } from '@/lib/react-query'
import axios from 'axios'
import { ToastError } from '@/components/toast-error'
import { toast } from 'sonner'

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

const editBudgetSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'A categoria é obrigatória'),
  value: z.number(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor inválida'),
  month: z.coerce.number().min(1, 'Mês inválido').max(12, 'Mês inválido'),
  year: z.coerce.number().min(2000, 'Ano inválido').max(2100, 'Ano inválido'),
})

type EditBudgetFormData = z.infer<typeof editBudgetSchema>

interface EditBudgetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  id: number
  title: string
  value: number
  date: string
  color: string
}

export function EditBudget({
  open,
  onOpenChange,
  id,
  title,
  value,
  date,
  color,
}: EditBudgetProps) {
  const { mutateAsync: editBudgetFn } = useMutation({
    mutationFn: editBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
  })

  const dateFormated = new Date(date)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    watch,
  } = useForm<EditBudgetFormData>({
    resolver: zodResolver(editBudgetSchema),
    defaultValues: {
      id: id,
      title: title,
      value: value,
      color: color,
      month: dateFormated.getMonth() + 1,
      year: dateFormated.getFullYear(),
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

  async function handleEditBudget(data: EditBudgetFormData) {
    try {
      await editBudgetFn({
        id: data.id,
        title: data.title,
        value: data.value,
        month: data.month,
        year: data.year,
        color: data.color,
      })
      onOpenChange(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ToastError({ error })
      } else {
        toast.error('Erro ao atualizar a senha.')
      }
    }
  }

  function handleCloseBudget() {
    reset()
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
          onSubmit={handleSubmit(handleEditBudget)}
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
