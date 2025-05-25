'use client'

import type React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/auth-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { InputError } from '@/components/input-error'
import { useMutation } from '@tanstack/react-query'
import { editUser } from '@/api/edit-user'
import { ToastError } from '@/components/toast-error'
import axios from 'axios'
import { toast } from 'sonner'
import { useEffect, useState, useRef } from 'react'
import { Camera, Download, User, X } from 'lucide-react'
import userPng from '@/assets/user.png'

const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(8, 'O nome deve conter pelo menos 8 caracteres')
    .max(100, 'O nome está muito longo — use no máximo 100 caracteres')
    .refine((val) => val.split(' ').length >= 2, {
      message: 'Informe o nome completo (nome e sobrenome)',
    }),
  email: z.string().trim().email('Informe um e-mail válido'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true // se vazio ou undefined, aceita
        const trimmed = val.trim()
        return trimmed.length >= 10
      },
      { message: 'Número de telefone muito curto' },
    )
    .refine(
      (val) => {
        if (!val) return true
        const trimmed = val.trim()
        return trimmed.length <= 15
      },
      { message: 'Número de telefone muito longo' },
    )
    .refine(
      (val) => {
        if (!val) return true
        return /^\+?[0-9]{10,15}$/.test(val)
      },
      {
        message:
          'Número de telefone inválido. Use apenas números, com ou sem DDD',
      },
    ),
  profilePhoto: z
    .instanceof(File)
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
          file.type,
        ),
      {
        message: 'Formato de imagem inválido. Use JPEG, PNG, GIF ou WebP',
      },
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'A imagem deve ter no máximo 5MB',
    })
    .optional(),
  hasExistingPhoto: z.boolean(),
})

type EditProfileForm = z.infer<typeof profileSchema>

export function ProfileUpdate() {
  const { user, updateUser } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isProfileSaved, setIsProfileSaved] = useState(false)
  const [hasExistingPhoto, setHasExistingPhoto] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      hasExistingPhoto: false,
    },
  })

  const nameWatch = watch('name')
  const profilePhotoWatch = watch('profilePhoto')
  const hasExistingPhotoWatch = watch('hasExistingPhoto')

  const hasValidPhoto = !!(profilePhotoWatch || hasExistingPhotoWatch)
  const activeButton = !!nameWatch && hasValidPhoto

  const { mutateAsync: editUserFn } = useMutation({
    mutationFn: editUser,
  })

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
        // Se for um objeto com índices numéricos, converter para array
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

        // Converter array de bytes para Blob e depois para URL
        const uint8Array = new Uint8Array(byteArray)
        const blob = new Blob([uint8Array], { type: 'image/png' })
        return URL.createObjectURL(blob)
      } catch (error) {
        console.error('Erro ao converter imagem:', error)
        return null
      }
    }

    if (user?.profilePhoto) {
      // Se for string (URL ou base64)
      if (typeof user.profilePhoto === 'string') {
        setPreviewImageUrl(user.profilePhoto)
      }
      // Se for objeto/array de bytes
      else {
        const imageUrl = convertByteArrayToImageUrl(user.profilePhoto)
        if (imageUrl) {
          setPreviewImageUrl(imageUrl)
        } else {
          setPreviewImageUrl(userPng)
        }
      }

      // Marca que tem foto existente
      setHasExistingPhoto(true)
      setValue('hasExistingPhoto', true)
      clearErrors('profilePhoto') // Remove erro se tinha
    } else {
      setPreviewImageUrl(userPng)
      setHasExistingPhoto(false)
      setValue('hasExistingPhoto', false)
    }

    // Cleanup function para revogar URLs criadas
    return () => {
      if (previewImageUrl && previewImageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewImageUrl)
      }
    }
  }, [user, setValue, clearErrors])

  // Validação em tempo real
  useEffect(() => {
    if (!hasValidPhoto) {
      setError('profilePhoto', {
        type: 'required',
        message: 'É obrigatório ter uma foto de perfil',
      })
    } else {
      clearErrors('profilePhoto')
    }
  }, [hasValidPhoto, setError, clearErrors])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (
      !['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
        file.type,
      )
    ) {
      toast.error('Formato de imagem inválido. Use JPEG, PNG, GIF ou WebP.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 5MB.')
      return
    }

    setSelectedFile(file)
    setValue('profilePhoto', file)
    clearErrors('profilePhoto')

    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewImageUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setSelectedFile(null)
    setValue('profilePhoto', undefined)

    // Se tinha foto existente, volta para ela
    if (hasExistingPhoto && user?.profilePhoto) {
      if (typeof user.profilePhoto === 'string') {
        setPreviewImageUrl(user.profilePhoto)
      } else {
        // Reconverter a imagem original
        const convertByteArrayToImageUrl = (byteData: any) => {
          try {
            let byteArray: number[]

            if (byteData && typeof byteData === 'object' && byteData.data) {
              byteArray = Array.isArray(byteData.data)
                ? byteData.data
                : Object.values(byteData.data)
            } else if (
              typeof byteData === 'object' &&
              !Array.isArray(byteData)
            ) {
              byteArray = Object.values(byteData) as number[]
            } else if (Array.isArray(byteData)) {
              byteArray = byteData
            } else {
              return null
            }

            const uint8Array = new Uint8Array(byteArray)
            const blob = new Blob([uint8Array], { type: 'image/png' })
            return URL.createObjectURL(blob)
          } catch (error) {
            console.error('Erro ao converter imagem:', error)
            return null
          }
        }

        const imageUrl = convertByteArrayToImageUrl(user.profilePhoto)
        setPreviewImageUrl(imageUrl || userPng)
      }
    } else {
      // Se não tinha foto existente, remove completamente
      setPreviewImageUrl(userPng)
      setValue('hasExistingPhoto', false)
      setHasExistingPhoto(false)
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSelectImage = () => {
    fileInputRef.current?.click()
  }

  const handleDownloadImage = () => {
    if (previewImageUrl && user?.profilePhoto) {
      const link = document.createElement('a')
      link.href = previewImageUrl
      link.download = `foto-perfil-${user.name?.replace(/\s+/g, '-').toLowerCase()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  async function handleSaveProfile(data: EditProfileForm) {
    // Validação final antes do envio
    if (!data.profilePhoto && !data.hasExistingPhoto) {
      setError('profilePhoto', {
        type: 'required',
        message: 'É obrigatório ter uma foto de perfil',
      })
      return
    }

    try {
      const response = await editUserFn({
        name: data.name,
        phone: data.phone || null,
        profilePhoto: data.profilePhoto || null,
      })

      const updateData: Partial<typeof user> = {
        name: response.user.name,
        phone: response.user.phone || null,
        profilePhoto: response.user.profilePhoto,
      }

      updateUser(updateData)

      // Limpa o arquivo selecionado
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      setIsProfileSaved(true)
      setTimeout(() => setIsProfileSaved(false), 3000)

      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ToastError({ error })
      } else {
        console.log(error)
        toast.error('Ocorreu um erro inesperado.')
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil</CardTitle>
        <CardDescription>Atualize suas informações pessoais</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleSaveProfile)}>
          {/* Foto de Perfil */}
          <div className="space-y-4">
            <Label>Foto de Perfil *</Label>

            <div className="flex items-start gap-6">
              {/* Preview da Imagem */}
              <div className="relative">
                <div
                  className={`flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed overflow-hidden ${
                    !hasValidPhoto
                      ? 'border-destructive bg-destructive/10'
                      : 'border-border bg-muted'
                  }`}
                >
                  {previewImageUrl && previewImageUrl !== userPng ? (
                    <img
                      src={previewImageUrl || '/placeholder.svg'}
                      alt="Foto de perfil"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User
                      className={`h-8 w-8 ${!hasValidPhoto ? 'text-destructive' : 'text-muted-foreground'}`}
                    />
                  )}
                </div>

                {/* Indicador de nova imagem */}
                {selectedFile && (
                  <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Camera className="h-3 w-3" />
                  </div>
                )}

                {/* Indicador de foto existente */}
                {hasExistingPhoto && !selectedFile && (
                  <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
                    ✓
                  </div>
                )}
              </div>

              {/* Controles */}
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSelectImage}
                  className="gap-2"
                >
                  <Camera className="h-4 w-4" />
                  {hasExistingPhoto ? 'Alterar foto' : 'Selecionar foto'}
                </Button>

                {selectedFile && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveImage}
                    className="gap-2 text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                    Cancelar
                  </Button>
                )}

                {previewImageUrl &&
                  previewImageUrl !== userPng &&
                  hasExistingPhoto &&
                  !selectedFile && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleDownloadImage}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Baixar
                    </Button>
                  )}
              </div>
            </div>

            {/* Input file oculto */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Informações sobre o arquivo */}
            <div className="text-sm text-muted-foreground">
              {selectedFile ? (
                <p className="text-primary">
                  ✓ Nova imagem selecionada: {selectedFile.name} (
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              ) : hasExistingPhoto ? (
                <p className="text-emerald-600">
                  ✓ Usando foto atual do perfil
                </p>
              ) : (
                <p className="text-destructive">
                  ⚠ É obrigatório ter uma foto de perfil
                </p>
              )}
              <p className="mt-1">
                Formatos aceitos: JPEG, PNG, GIF, WebP. Tamanho máximo: 5MB.
              </p>
            </div>
            <InputError error={''} />
          </div>

          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Seu nome completo"
            />
            <InputError error={errors.name?.message} />
          </div>

          {/* Email (readonly) */}
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              readOnly
              {...register('email')}
              className="bg-muted cursor-not-allowed"
              placeholder="seu@email.com"
            />
            <p className="text-xs text-muted-foreground">
              O e-mail não pode ser alterado
            </p>
            <InputError error={errors.email?.message} />
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone (opcional)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              {...register('phone')}
            />
            <InputError error={errors.phone?.message} />
          </div>

          {/* Botão de salvar */}
          <Button
            type="submit"
            disabled={isSubmitting || !activeButton}
            className="w-full"
          >
            {isSubmitting
              ? 'Salvando...'
              : isProfileSaved
                ? 'Salvo com sucesso!'
                : 'Salvar alterações'}
          </Button>

          {/* Indicador de validação */}
          {!hasValidPhoto && (
            <p className="text-sm text-destructive text-center">
              ⚠ É obrigatório ter uma foto de perfil para salvar
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
