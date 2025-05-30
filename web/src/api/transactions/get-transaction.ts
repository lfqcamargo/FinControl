import axios from 'axios'
import { env } from '@/env'
import type { Transaction } from './types'

export async function getTransactionById(id: string) {
  const response = await axios.get<Transaction>(
    `${env.VITE_API_URL}/transactions/${id}`,
  )
  return response.data
}
