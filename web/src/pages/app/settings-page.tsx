import { ProfileUpdate } from './components/settings/profile-update'
import { Preferences } from './components/settings/preferences'
import { PasswordChange } from './components/settings/password-change'

export function SettingsPage() {
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
        <Preferences />
        <PasswordChange />
      </div>
    </div>
  )
}
