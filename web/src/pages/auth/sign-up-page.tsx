import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
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
import { Eye, EyeOff, LockKeyhole, Mail, User } from 'lucide-react'
import { useState } from 'react'

import { createUser } from '@/api/create-user'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ToastError } from '@/components/toast-error'

const signUpForm = z
  .object({
    name: z
      .string()
      .trim()
      .min(8, { message: 'O nome deve conter pelo menos 8 caracteres' })
      .max(100, { message: 'O nome está muito longo. Use até 100 caracteres' })
      .refine((val) => val.split(' ').length >= 2, {
        message: 'Informe o nome completo (nome e sobrenome)',
      }),
    email: z.string().trim().email({ message: 'Informe um email válido' }),
    password: z
      .string()
      .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
      .max(20, { message: 'A senha deve ter no máximo 20 caracteres' })
      .regex(/[A-Z]/, {
        message: 'A senha deve conter pelo menos uma letra maiúscula',
      })
      .regex(/[a-z]/, {
        message: 'A senha deve conter pelo menos uma letra minúscula',
      })
      .regex(/[0-9]/, {
        message: 'A senha deve conter pelo menos um número',
      })
      .regex(/[^A-Za-z0-9]/, {
        message: 'A senha deve conter pelo menos um caractere especial',
      }),
    repeatPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.repeatPassword) {
      ctx.addIssue({
        path: ['repeatPassword'],
        message: 'As senhas não coincidem',
        code: z.ZodIssueCode.custom,
      })
    }
  })

type SignUpForm = z.infer<typeof signUpForm>

export function SignUpPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  })

  const { mutateAsync: createUserFn } = useMutation({
    mutationFn: createUser,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      await createUserFn({
        name: data.name,
        email: data.email,
        password: data.password,
      })
      reset()
      navigate(`/sign-in?email=${data.email}`)
      toast.success('Cadastro realizado com sucesso!')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ToastError({ error })
      } else {
        toast.error('Ocorreu um erro inesperado.')
      }
    }
  }

  let activeButton = false
  const nameWatch = watch('name')
  const emailWatch = watch('email')
  const passwordWatch = watch('password')
  const repeatPasswordWatch = watch('repeatPassword')

  if (!nameWatch || !emailWatch || !passwordWatch || !repeatPasswordWatch) {
    activeButton = false
  } else {
    activeButton = true
  }

  return (
    <div className="flex w-full flex-col items-center px-12 py-8">
      <div className="mb-6 flex justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/30">
          <User className="h-12 w-12 text-primary" />
        </div>
      </div>

      <Card className="w-full max-w-[500px] border border-border bg-card shadow-lg dark:border-border/30 dark:bg-card/95">
        <CardHeader className="space-y-2 pb-4 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
            Criar conta grátis
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Seja um parceiro e comece suas vendas!
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-base font-medium text-foreground"
              >
                Nome completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  className="h-12 border-input bg-background pl-10 text-base text-foreground transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-input/50 dark:bg-background/80 dark:focus:border-primary dark:focus:ring-primary/30"
                  placeholder="Seu nome completo"
                  {...register('name')}
                />
              </div>
              <p className="min-h-[16px] pl-1 mb-2 text-sm text-destructive">
                {errors.name?.message}
              </p>
            </div>

            <div className="space-y-2">
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
              <p className="min-h-[16px] pl-1 mb-2 text-sm text-destructive">
                {errors.email?.message}
              </p>
            </div>

            <div className="space-y-2">
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
                  placeholder="Mínimo de 8 caracteres"
                  {...register('password')}
                />
                <Button
                  tabIndex={-1}
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff focusable={'false'} className="h-5 w-5" />
                  ) : (
                    <Eye focusable={'false'} className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <p className="min-h-[16px] pl-1 mb-2 text-sm text-destructive">
                {errors.password?.message}
              </p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="repeatPassword"
                className="text-base font-medium text-foreground"
              >
                Confirme sua senha
              </Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="repeatPassword"
                  type={showRepeatPassword ? 'text' : 'password'}
                  className="h-12 border-input bg-background pl-10 pr-10 text-base text-foreground transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-input/50 dark:bg-background/80 dark:focus:border-primary dark:focus:ring-primary/30"
                  placeholder="Repita sua senha"
                  {...register('repeatPassword')}
                />
                <Button
                  tabIndex={-1}
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                  {showRepeatPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <p className="min-h-[16px] pl-1 mb-2 text-sm text-destructive">
                {errors.repeatPassword?.message}
              </p>
            </div>

            <Button
              disabled={isSubmitting || !activeButton}
              className="h-12 w-full bg-primary text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
              type="submit"
            >
              {isSubmitting ? 'Processando...' : 'CADASTRAR'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-4 flex w-full max-w-[500px] items-center justify-center space-x-2">
        <span className="text-muted-foreground">Já tem uma conta?</span>
        <Button
          variant="ghost"
          asChild
          className="text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/90"
        >
          <Link to="/sign-in">Faça Login</Link>
        </Button>
      </div>
    </div>
  )
}
