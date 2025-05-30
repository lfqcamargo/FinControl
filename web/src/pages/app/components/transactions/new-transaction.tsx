import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import { fetchBudgets } from '@/api/fetch-budgets'
import { useMutation } from '@tanstack/react-query'
import { createTransaction } from '@/api/transactions/create-transaction'
import { queryClient } from '@/lib/react-query'
import axios from 'axios'
import { ToastError } from '@/components/toast-error'
import { toast } from 'sonner'

const newTransactionSchema = z.object({
  description: z.string().min(1, 'A descrição é obrigatória'),
  value: z.coerce.number().gt(0, 'O valor deve ser maior que 0'),
  observation: z.string(),
  budgetId: z.number(),
  date: z.coerce.date(),
})

type NewTransactionFormData = z.infer<typeof newTransactionSchema>

interface NewTransactionProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewTransaction({ open, onOpenChange }: NewTransactionProps) {
  const [budgets, setBudgets] = useState<{ id: number; title: string }[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    watch,
  } = useForm<NewTransactionFormData>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      description: '',
      value: 0,
      observation: '',
      budgetId: 0,
      date: new Date(),
    },
  })

  const descriptionWatch = watch('description')
  const valueWatch = watch('value')
  const observationWatch = watch('observation')
  const budgetIdWatch = watch('budgetId')
  const dateWatch = watch('date')

  let actionButton = false
  if (
    !descriptionWatch ||
    !valueWatch ||
    !observationWatch ||
    !budgetIdWatch ||
    !dateWatch
  ) {
    actionButton = false
  } else {
    actionButton = true
  }

  useEffect(() => {
    async function loadBudgets() {
      if (!dateWatch) return

      const date = new Date(dateWatch)
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const response = await fetchBudgets({ month, year })

      setBudgets(response.budgets)
    }

    loadBudgets()
  }, [dateWatch])

  const { mutateAsync: createTransactionFn } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  async function handleCreateTransaction(data: NewTransactionFormData) {
    try {
      await createTransactionFn({
        description: data.description,
        value: data.value,
        observation: data.observation,
        budgetId: data.budgetId,
      })
      reset()
      onOpenChange(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ToastError({ error })
      } else {
        toast.error('Erro interno')
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nova Transação</DialogTitle>
          <DialogDescription>
            Adicione uma nova transação ao seu controle financeiro.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Input
              id="description"
              placeholder="Ex: Supermercado"
              className="col-span-3"
              {...register('description')}
            />
            <p className="min-h-[8px] pl-1 mb-2 text-sm text-destructive">
              {errors.description?.message}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="amount" className="text-right">
              Valor (R$)
            </Label>
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
            <p className="min-h-[8px] pl-1 mb-2 text-sm text-destructive">
              {errors.value?.message}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="notes" className="text-right">
              Observações
            </Label>
            <Textarea
              id="notes"
              placeholder="Detalhes adicionais sobre a transação"
              className="col-span-3"
              {...register('observation')}
            />
            <p className="min-h-[8px] pl-1 mb-2 text-sm text-destructive">
              {errors.observation?.message}
            </p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-1">
          <Label htmlFor="date" className="text-right">
            Data:
          </Label>
          <Input
            id="date"
            type="date"
            className="w-1/3"
            {...register('date')}
          />
          <p className="min-h-[8px] pl-1 mb-2 text-sm text-destructive">
            {errors.date?.message}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="budget" className="text-right">
            Orçamento
          </Label>
          <Controller
            name="budgetId"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value?.toString()}
                disabled={!dateWatch}
              >
                <SelectTrigger
                  className={`w-full ${
                    !dateWatch
                      ? 'opacity-50 cursor-not-allowed pointer-events-none bg-muted'
                      : ''
                  }`}
                >
                  <SelectValue placeholder="Selecione um orçamento" />
                </SelectTrigger>
                <SelectContent>
                  {budgets.map((budget) => (
                    <SelectItem
                      key={budget.id}
                      className="hover:bg-gray-100"
                      value={budget.id.toString()}
                    >
                      {budget.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            disabled={!actionButton || isSubmitting}
            onClick={handleSubmit(handleCreateTransaction)}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
