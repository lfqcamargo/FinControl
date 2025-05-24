import { ThemeProvider } from './components/ui/theme/theme-provider'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'

import { router } from './routes'
import { Toaster } from 'sonner'
import { queryClient } from './lib/react-query'
import './index.css'
import { AuthProvider } from './contexts/auth-context'

export function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="controle-financas">
      <Toaster richColors />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
