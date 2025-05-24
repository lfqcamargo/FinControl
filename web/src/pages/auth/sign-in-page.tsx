'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'

import { signIn } from '@/api/sign-in'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ToastError } from '@/components/toast-error'
import axios from 'axios'
import { useAuth } from '@/contexts/auth-context'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  rememberMe: z.boolean().optional(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignInPage() {
  const [searchParams] = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const { checkAuth } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
      password: '',
      rememberMe: false,
    },
  })

  let activeButton = false
  const emailWatch = watch('email')
  const passwordWatch = watch('password')

  if (!emailWatch || !passwordWatch) {
    activeButton = false
  } else {
    activeButton = true
  }

  const { mutateAsync: signInFn } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await signInFn({ email: data.email, password: data.password })

      // Mostra sucesso primeiro
      toast.success('Login realizado com sucesso!')

      // Limpa o formulário
      reset()

      // Aguarda um pouco antes de atualizar o contexto e navegar
      setTimeout(async () => {
        try {
          // Atualiza o contexto de autenticação
          await checkAuth()

          // Navega para a página principal
          navigate('/', { replace: true })
        } catch (error) {
          console.error('Erro ao verificar autenticação:', error)
          // Mesmo com erro, tenta navegar (o usuário pode estar logado)
          navigate('/', { replace: true })
        }
      }, 100)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ToastError({ error })
      } else {
        toast.error('Ocorreu um erro inesperado.')
      }
    }
  }

  return (
    <div className="flex w-full flex-col items-center px-12 py-8">
      <div className="mb-6 flex justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/30">
          <LockKeyhole className="h-12 w-12 text-primary" />
        </div>
      </div>

      <Card className="w-full max-w-[500px] border border-border bg-card shadow-lg dark:border-border/30 dark:bg-card/95">
        <CardHeader className="space-y-2 pb-4 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
            Acessar painel
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Acompanhe suas finanças pelo painel do FinControl!
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="text-base font-medium text-foreground"
              >
                Seu e-mail
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  className="h-12 border-input bg-background pl-10 text-base text-foreground transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-input/50 dark:bg-background/80 dark:focus:border-primary dark:focus:ring-primary/30"
                  placeholder="seu@email.com"
                  {...register('email')}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="password"
                className="text-base font-medium text-foreground"
              >
                Sua senha
              </Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="h-12 border-input bg-background pl-10 pr-10 text-base text-foreground transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-input/50 dark:bg-background/80 dark:focus:border-primary dark:focus:ring-primary/30"
                  placeholder="••••••••"
                  {...register('password')}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  {...register('rememberMe')}
                  className="border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:border-input/70"
                />
                <Label
                  htmlFor="rememberMe"
                  className="cursor-pointer text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Lembrar-me
                </Label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-primary transition-colors hover:text-primary/80 dark:text-primary dark:hover:text-primary/90"
              >
                Esqueceu sua senha?
              </Link>
            </div>

            <Button
              disabled={isSubmitting || !activeButton}
              className="h-12 w-full bg-primary text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
              type="submit"
            >
              {isSubmitting ? 'Processando...' : 'Acessar painel'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-6 flex w-full max-w-[500px] justify-between">
        <Button
          variant="ghost"
          asChild
          size="sm"
          className="text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:bg-background/10 dark:hover:text-foreground"
        >
          <Link to="/help" className="text-sm">
            Precisa de ajuda?
          </Link>
        </Button>

        <Button
          variant="default"
          asChild
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
        >
          <Link to="/sign-up">Novo Usuário</Link>
        </Button>
      </div>
    </div>
  )
}
