import axios from 'axios'
import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true, // Importante para cookies
})

// Interceptor para refresh automático
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Tenta renovar o token
        await api.post('/auth/refresh')

        // Repete a requisição original
        return api(originalRequest)
      } catch (refreshError) {
        // Se falhar, redireciona para login apenas se não estiver já na página de login
        if (!window.location.pathname.includes('/sign-in')) {
          console.log('Refresh token expirado, redirecionando para login')
          window.location.href = '/sign-in'
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )
    return config
  })
}
