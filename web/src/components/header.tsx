'use client'

import { Bell, LogOut, Settings, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ModeToggle } from '@/components/ui/theme/theme-toggle'
import { useAuth } from '@/contexts/auth-context'
import { useEffect, useState } from 'react'

export function DashboardHeader() {
  const { user, signOut } = useAuth()
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null)

  // Converter imagem de bytes para URL
  useEffect(() => {
    const convertByteArrayToImageUrl = (byteData: any) => {
      try {
        let byteArray: number[]

        // Se for um Buffer com propriedade data
        if (byteData && typeof byteData === 'object' && byteData.data) {
          byteArray = Array.isArray(byteData.data)
            ? byteData.data
            : Object.values(byteData.data)
        }
        // Se for um objeto com índices numéricos
        else if (typeof byteData === 'object' && !Array.isArray(byteData)) {
          byteArray = Object.values(byteData) as number[]
        }
        // Se já for um array
        else if (Array.isArray(byteData)) {
          byteArray = byteData
        }
        // Se não conseguir converter, retorna null
        else {
          return null
        }

        const uint8Array = new Uint8Array(byteArray)
        const blob = new Blob([uint8Array], { type: 'image/png' })
        const url = URL.createObjectURL(blob)
        return url
      } catch (error) {
        return null
      }
    }

    // Limpar URL anterior se existir
    if (userImageUrl && userImageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(userImageUrl)
    }

    if (user?.profilePhoto) {
      // Se for string (URL ou base64)
      if (typeof user.profilePhoto === 'string') {
        setUserImageUrl(user.profilePhoto)
      }
      // Se for objeto/array de bytes
      else {
        const imageUrl = convertByteArrayToImageUrl(user.profilePhoto)
        setUserImageUrl(imageUrl)
      }
    } else {
      setUserImageUrl(null)
    }

    // Cleanup function
    return () => {
      if (userImageUrl && userImageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(userImageUrl)
      }
    }
  }, [user?.name, user?.profilePhoto]) // Dependências específicas para reagir às mudanças

  const handleSignOut = async () => {
    // Logout é async novamente para chamar o backend
    await signOut()
  }

  // Função para gerar iniciais do nome
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  function getFirstAndLastName(fullName: string) {
    if (!fullName) return 'Usuário'

    const parts = fullName.trim().split(/\s+/)

    if (parts.length === 1) return parts[0]

    return parts[0] + ' ' + parts[parts.length - 1]
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border/40 bg-background/95 px-6 backdrop-blur-sm dark:border-border/20 dark:bg-card/95">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
            <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
            <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
          </svg>
          <span className="hidden text-lg font-bold md:inline-block">
            FinControl
          </span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <ModeToggle />

        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative flex h-9 items-center gap-2 rounded-full px-2 hover:bg-muted"
            >
              <Avatar className="h-8 w-8 border border-border/50">
                <AvatarImage
                  src={userImageUrl || '/placeholder.svg?height=32&width=32'}
                  alt={user?.name || 'Usuário'}
                />
                <AvatarFallback className="text-xs">
                  {user?.name ? getInitials(user.name) : 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:inline-block">
                {user?.name ? getFirstAndLastName(user.name) : 'Usuário'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.name ? getFirstAndLastName(user.name) : 'Usuário'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive cursor-pointer"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
