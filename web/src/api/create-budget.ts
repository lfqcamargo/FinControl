import { api } from '@/lib/axios'

export interface CreateBudgetBody {
  title: string
  value: number
  date: Date
  color: string
}

export async function createBudget({
  title,
  value,
  date,
  color,
}: CreateBudgetBody) {
  await api.post('/budgets', { title, value, date, color })
}
