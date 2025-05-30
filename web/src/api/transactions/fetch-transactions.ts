import { api } from '@/lib/axios'

export interface Transaction {
  id: number
  budgetId: number
  description: string
  value: number
  observation: string
}

export interface FetchTransactionsResponse {
  transactions: Transaction[]
}

export async function fetchTransactions(): Promise<FetchTransactionsResponse> {
  const response = await api.get('/transactions')

  return response.data.transactions
}
