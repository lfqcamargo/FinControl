import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { ModeToggle } from '@/components/ui/theme/theme-toggle'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function SettingsPage() {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [isProfileSaved, setIsProfileSaved] = useState(false)
  const [isPreferencesSaved, setIsPreferencesSaved] = useState(false)
  const [isRegionSaved, setIsRegionSaved] = useState(false)

  const [profileForm, setProfileForm] = useState({
    name: 'Lucas Fernando Quinato de Camargo',
    email: 'lfqcamargo@gmail.com',
    phone: '',
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [preferences, setPreferences] = useState({
    notifications: true,
    emailNotifications: true,
    budgetAlerts: true,
  })

  const [regionSettings, setRegionSettings] = useState({
    currency: 'BRL',
    dateFormat: 'DD/MM/YYYY',
    language: 'pt-BR',
  })

  // Função para salvar o perfil
  const saveProfile = () => {
    console.log('Salvando perfil:', profileForm)
    setIsProfileSaved(true)
    setTimeout(() => setIsProfileSaved(false), 3000)
  }

  // Função para atualizar a senha
  const updatePassword = () => {
    // Validação básica
    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      alert('Por favor, preencha todos os campos.')
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('As senhas não coincidem.')
      return
    }

    console.log('Atualizando senha')
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    setIsPasswordDialogOpen(false)
  }

  // Função para salvar preferências
  const savePreferences = () => {
    console.log('Salvando preferências:', preferences)
    setIsPreferencesSaved(true)
    setTimeout(() => setIsPreferencesSaved(false), 3000)
  }

  // Função para salvar configurações regionais
  const saveRegionSettings = () => {
    console.log('Salvando configurações regionais:', regionSettings)
    setIsRegionSaved(true)
    setTimeout(() => setIsRegionSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências e configurações da conta
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>
              Atualize suas informações pessoais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                saveProfile()
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  value={profileForm.name}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileForm.email}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={profileForm.phone}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, phone: e.target.value })
                  }
                />
              </div>
              <Button type="submit">
                {isProfileSaved ? 'Salvo com sucesso!' : 'Salvar alterações'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
            <CardDescription>
              Gerencie sua senha e segurança da conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Sua senha deve ter pelo menos 8 caracteres e incluir letras
                maiúsculas, minúsculas, números e caracteres especiais.
              </p>
              <p className="text-sm">
                Última atualização de senha:{' '}
                <span className="font-medium">15/04/2023</span>
              </p>
              <Button onClick={() => setIsPasswordDialogOpen(true)}>
                Alterar senha
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferências</CardTitle>
            <CardDescription>
              Personalize sua experiência no aplicativo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tema</Label>
                <p className="text-sm text-muted-foreground">
                  Escolha entre tema claro, escuro ou sistema
                </p>
              </div>
              <ModeToggle />
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="notifications"
                  checked={preferences.notifications}
                  onCheckedChange={(checked) =>
                    setPreferences({
                      ...preferences,
                      notifications: checked as boolean,
                    })
                  }
                />
                <div className="space-y-1 leading-none">
                  <Label htmlFor="notifications">Notificações</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações sobre transações e orçamentos
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="email-notifications"
                  checked={preferences.emailNotifications}
                  onCheckedChange={(checked) =>
                    setPreferences({
                      ...preferences,
                      emailNotifications: checked as boolean,
                    })
                  }
                />
                <div className="space-y-1 leading-none">
                  <Label htmlFor="email-notifications">
                    Notificações por e-mail
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receba relatórios semanais e alertas importantes por e-mail
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="budget-alerts"
                  checked={preferences.budgetAlerts}
                  onCheckedChange={(checked) =>
                    setPreferences({
                      ...preferences,
                      budgetAlerts: checked as boolean,
                    })
                  }
                />
                <div className="space-y-1 leading-none">
                  <Label htmlFor="budget-alerts">Alertas de orçamento</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba alertas quando estiver próximo de atingir o limite do
                    orçamento
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={savePreferences}>
              {isPreferencesSaved
                ? 'Salvo com sucesso!'
                : 'Salvar preferências'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Moeda e Região</CardTitle>
            <CardDescription>
              Configure suas preferências regionais
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Moeda padrão</Label>
              <select
                id="currency"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={regionSettings.currency}
                onChange={(e) =>
                  setRegionSettings({
                    ...regionSettings,
                    currency: e.target.value,
                  })
                }
              >
                <option value="BRL">Real Brasileiro (R$)</option>
                <option value="USD">Dólar Americano ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">Libra Esterlina (£)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-format">Formato de data</Label>
              <select
                id="date-format"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={regionSettings.dateFormat}
                onChange={(e) =>
                  setRegionSettings({
                    ...regionSettings,
                    dateFormat: e.target.value,
                  })
                }
              >
                <option value="DD/MM/YYYY">DD/MM/AAAA</option>
                <option value="MM/DD/YYYY">MM/DD/AAAA</option>
                <option value="YYYY-MM-DD">AAAA-MM-DD</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Idioma</Label>
              <select
                id="language"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={regionSettings.language}
                onChange={(e) =>
                  setRegionSettings({
                    ...regionSettings,
                    language: e.target.value,
                  })
                }
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es">Español</option>
              </select>
            </div>

            <Button onClick={saveRegionSettings}>
              {isRegionSaved ? 'Salvo com sucesso!' : 'Salvar configurações'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Modal para Alterar Senha */}
      <Dialog
        open={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Alterar Senha</DialogTitle>
            <DialogDescription>
              Crie uma nova senha para sua conta.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Senha atual</Label>
              <Input
                id="current-password"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    currentPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova senha</Label>
              <Input
                id="new-password"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar nova senha</Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPasswordDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={updatePassword}>Atualizar senha</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
