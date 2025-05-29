import { api } from '@/lib/axios'

export interface Budget {
  id: number
  title: string
  date: string
  value: number
  color: string
}

export interface FetchBudgetsResponse {
  budgets: Budget[]
  totalValue: number
}

interface FetchBudgetsParams {
  month: number // 1–12
  year: number
}

export async function fetchBudgets({
  month,
  year,
}: FetchBudgetsParams): Promise<FetchBudgetsResponse> {
  const response = await api.get('/budgets', {
    params: { month, year },
  })

  return response.data.budgets
}
