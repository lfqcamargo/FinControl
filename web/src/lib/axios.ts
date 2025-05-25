import axios from 'axios'
import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await api.post('/auth/refresh')
        return api(originalRequest)
      } catch (refreshError) {
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
