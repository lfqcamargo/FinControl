import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { z } from 'zod'

const preferencesShema = z.object({
  phoneNotifications: z.boolean(),
  emailNotifications: z.boolean(),
  budgetsNotifications: z.boolean(),
  reportsNotifications: z.boolean(),
})

type PreferenceForm = z.infer<typeof preferencesShema>

export function Preferences() {
  const [isPreferencesSaved, setIsPreferencesSaved] = useState(false)

  const savePreferences = () => {
    console.log('Saving preferences:', preferences)
    setIsPreferencesSaved(true)
    setTimeout(() => setIsPreferencesSaved(false), 3000)
  }

  const [preferences, setPreferences] = useState({
    phoneNotifications: false,
    emailNotifications: false,
    budgetsNotifications: false,
    reportsNotifications: false,
  })

  return (
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
            <Label htmlFor="emailNotifications">Notificações por e-mail</Label>
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
          {isPreferencesSaved ? 'Salvo com sucesso!' : 'Salvar preferências'}
        </Button>
      </CardContent>
    </Card>
  )
}
