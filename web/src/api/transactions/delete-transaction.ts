import axios from 'axios'
import { env } from '@/env'

export async function deleteTransaction(id: string) {
  await axios.delete(`${env.VITE_API_URL}/transactions/${id}`)
}
