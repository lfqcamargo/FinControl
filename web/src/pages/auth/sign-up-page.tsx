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

const signUpForm = z
  .object({
    name: z
      .string()
      .min(8, { message: 'Insira o nome completo' })
      .max(50, { message: 'Use o primeiro e ultimo nome' }),
    email: z.string().email({ message: 'Email inválido' }),
    password: z
      .string()
      .min(8, { message: 'A senha deve conter pelo menos 8 caracters' })
      .max(20, { message: 'A senha deve não pode ter mais de 20 caracteres' }),
    repeatPassword: z
      .string()
      .min(8, { message: 'A senha deve conter pelo menos 8 caracters' })
      .max(20, { message: 'A senha deve não pode ter mais de 20 caracteres' }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'As senhas não são iguais',
    path: ['repeatPassword'],
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

  // const { mutateAsync: registerUserFn } = useMutation({
  //   mutationFn: registerUser,
  // })

  async function handleSignUp(data: SignUpForm) {
    // try {
    //   await registerUserFn({
    //     name: data.name,
    //     email: data.email,
    //     password: data.password,
    //   })
    //   reset()
    //   navigate(`/sign-in?email=${data.email}`)
    //   toast.success('Cadastro realizado com sucesso!')
    // } catch (error) {
    //   toast.error('Erro ao realizar cadastro')
    // } finally {
    //   console.log(data)
    // }
    console.log(data)
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
        <CardContent className="pb-8">
          <form className="space-y-5" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-3">
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
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

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
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
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
                  placeholder="Mínimo de 8 caracteres"
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
              {errors.password && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
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
              {errors.repeatPassword && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.repeatPassword.message}
                </p>
              )}
            </div>

            <Button
              disabled={isSubmitting || !activeButton}
              className="mt-2 h-12 w-full bg-primary text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
              type="submit"
            >
              {isSubmitting ? 'Processando...' : 'CADASTRAR'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-6 flex w-full max-w-[500px] items-center justify-center space-x-2">
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
