import { api } from '@/lib/axios'

export interface CreateTransactionBody {
  description: string
  value: number
  observation: string
  budgetId: number
}

export async function createTransaction({
  description,
  value,
  observation,
  budgetId,
}: CreateTransactionBody) {
  await api.post('/transactions', { description, value, observation, budgetId })
}
