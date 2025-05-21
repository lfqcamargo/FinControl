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
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>
              Atualize suas informações pessoais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  defaultValue="Lucas Fernando Quinato de Camargo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="lfqcamargo@gmail.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" type="tel" placeholder="(00) 00000-0000" />
              </div>
              <Button>Salvar alterações</Button>
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
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha atual</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova senha</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button>Atualizar senha</Button>
            </form>
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
                <Checkbox id="notifications" defaultChecked />
                <div className="space-y-1 leading-none">
                  <Label htmlFor="notifications">Notificações</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações sobre transações e orçamentos
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox id="email-notifications" defaultChecked />
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
                <Checkbox id="budget-alerts" defaultChecked />
                <div className="space-y-1 leading-none">
                  <Label htmlFor="budget-alerts">Alertas de orçamento</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba alertas quando estiver próximo de atingir o limite do
                    orçamento
                  </p>
                </div>
              </div>
            </div>

            <Button>Salvar preferências</Button>
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
                defaultValue="BRL"
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
                defaultValue="DD/MM/YYYY"
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
                defaultValue="pt-BR"
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es">Español</option>
              </select>
            </div>

            <Button>Salvar configurações</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
