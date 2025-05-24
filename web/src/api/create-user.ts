import { api } from '@/lib/axios'

export interface CreateUserBody {
  email: string
  password: string
  name: string
}

export async function createUser({ email, password, name }: CreateUserBody) {
  await api.post('/users', { email, password, name })
}
