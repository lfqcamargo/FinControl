import { api } from '@/lib/axios'

export interface EditUserBody {
  name: string
  phone?: string | null
  profilePhoto: File | null
}

export interface EditUserResponse {
  user: {
    id: string
    email: string
    name: string
    phone?: string | null
    profilePhoto?: string | null
  }
}

export async function editUser({
  name,
  phone,
  profilePhoto,
}: EditUserBody): Promise<EditUserResponse> {
  const formData = new FormData()

  formData.append('name', name)

  if (phone) {
    formData.append('phone', phone)
  }

  if (profilePhoto) {
    formData.append('profilePhoto', profilePhoto)
  }

  const response = await api.put('/users', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  })

  return response.data.data
}
