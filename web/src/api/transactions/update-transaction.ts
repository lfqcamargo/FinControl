import axios from 'axios'
import { env } from '@/env'
import type { Transaction, CreateTransactionInput } from './types'

export async function updateTransaction(
  id: string,
  data: Partial<CreateTransactionInput>,
) {
  const response = await axios.put<Transaction>(
    `${env.VITE_API_URL}/transactions/${id}`,
    data,
  )
  return response.data
}
