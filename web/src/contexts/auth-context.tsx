'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { api } from '@/lib/axios'
import axios from 'axios'
import { toast } from 'sonner'

interface User {
  id: string
  email: string
  name: string
  phone?: string | null
  profilePhoto?: any | null // pode ser string, array de bytes, ou objeto com índices numéricos
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signOut: () => Promise<void>
  checkAuth: () => Promise<void>
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  async function checkAuth() {
    try {
      setIsLoading(true)
      const response = await api.get('/auth/me')
      setUser(response.data.user)
    } catch (error) {
      setUser(null)
      // Só loga se não for erro 401 (não autenticado)
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        console.error('Erro ao verificar autenticação:', error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function signOut() {
    console.log('FAZENDO LOGOUT...')

    try {
      // Chama o backend para invalidar o token
      await api.post('/auth/logout')
      console.log('LOGOUT NO BACKEND REALIZADO')
    } catch (error) {
      console.error('Erro no logout do backend:', error)
      // Mesmo com erro, continua o logout local
    }

    // Limpa o estado local
    setUser(null)
    localStorage.removeItem('user')
    sessionStorage.clear()

    // Mostra sucesso
    toast.success('Logout realizado com sucesso!')

    console.log('REDIRECIONANDO...')

    // Redireciona para login
    window.location.href = '/sign-in'
  }

  function updateUser(userData: Partial<User>) {
    if (user) {
      const updatedUser = {
        ...user,
        ...userData,
      }

      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        signOut,
        checkAuth,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
