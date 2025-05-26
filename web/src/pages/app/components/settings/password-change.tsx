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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'

export function PasswordChange() {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
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

  return (
    <>
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
    </>
  )
}
