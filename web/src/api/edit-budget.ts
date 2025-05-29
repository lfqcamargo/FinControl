import { api } from '@/lib/axios'

export interface EditBudgetBody {
  id: number
  title: string
  value: number
  month: number
  year: number
  color: string
}

export async function editBudget({
  id,
  title,
  value,
  month,
  year,
  color,
}: EditBudgetBody) {
  await api.put(`/budgets/${id}`, { title, value, month, year, color })
}
