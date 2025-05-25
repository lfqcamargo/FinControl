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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useAuth } from '@/contexts/auth-context'
import { ProfileUpdate } from './components/settings/profile-update'

export function SettingsPage() {
  const { user } = useAuth()

  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [isPreferencesSaved, setIsPreferencesSaved] = useState(false)

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [preferences, setPreferences] = useState({
    phoneNotifications: false,
    emailNotifications: false,
    budgetsNotifications: false,
    reportsNotifications: false,
  })

  const updatePassword = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Por favor, preencha todos os campos.')
      return
    }
    if (newPassword !== confirmPassword) {
      alert('As senhas não coincidem.')
      return
    }
    console.log('Updating password')
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    setIsPasswordDialogOpen(false)
  }

  const savePreferences = () => {
    console.log('Saving preferences:', preferences)
    setIsPreferencesSaved(true)
    setTimeout(() => setIsPreferencesSaved(false), 3000)
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
        <ProfileUpdate />
        <Card>
          <CardHeader>
            <CardTitle>Preferências</CardTitle>
            <CardDescription>
              Personalize sua experiência no aplicativo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="phoneNotifications"
                checked={preferences.phoneNotifications}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    phoneNotifications: checked as boolean,
                  })
                }
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="phoneNotifications">
                  Notificações por telefone
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receba notificações no seu telefone
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="emailNotifications"
                checked={preferences.emailNotifications}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    emailNotifications: checked as boolean,
                  })
                }
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="emailNotifications">
                  Notificações por e-mail
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receba notificações no seu e-mail
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="budgetsNotifications"
                checked={preferences.budgetsNotifications}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    budgetsNotifications: checked as boolean,
                  })
                }
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="budgetsNotifications">
                  Notificações de orçamentos
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receba notificações dos seus orçamentos
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="reportsNotifications"
                checked={preferences.reportsNotifications}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    reportsNotifications: checked as boolean,
                  })
                }
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="reportsNotifications">
                  Notificações de relatórios
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receba notificações dos seus relatórios
                </p>
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
              <Button onClick={() => setIsPasswordDialogOpen(true)}>
                Alterar senha
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

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
            {[
              ['currentPassword', 'Senha atual'],
              ['newPassword', 'Nova senha'],
              ['confirmPassword', 'Confirmar nova senha'],
            ].map(([key, label]) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key}>{label}</Label>
                <Input
                  id={key}
                  type="password"
                  value={passwordForm[key]}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, [key]: e.target.value })
                  }
                />
              </div>
            ))}
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
