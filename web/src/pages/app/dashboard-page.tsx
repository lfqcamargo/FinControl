import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowDownIcon, ArrowUpIcon, DollarSign, Wallet } from 'lucide-react'

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral das suas finanças</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 12.580,00</div>
            <p className="text-xs text-muted-foreground">
              +2% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Receitas</CardTitle>
            <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 8.350,00</div>
            <p className="text-xs text-muted-foreground">
              +5% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <ArrowDownIcon className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 4.230,00</div>
            <p className="text-xs text-muted-foreground">
              -3% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Economia</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 4.120,00</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Transações Recentes</CardTitle>
            <CardDescription>Suas últimas 5 transações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Placeholder para transações */}
              <div className="flex items-center justify-between rounded-lg border border-border/50 p-3 dark:border-border/30">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                    <ArrowDownIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Supermercado</p>
                    <p className="text-xs text-muted-foreground">Alimentação</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-rose-500">- R$ 350,00</p>
                  <p className="text-xs text-muted-foreground">Hoje</p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border/50 p-3 dark:border-border/30">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 dark:bg-emerald-500/20">
                    <ArrowUpIcon className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-medium">Salário</p>
                    <p className="text-xs text-muted-foreground">Receita</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-emerald-500">+ R$ 5.000,00</p>
                  <p className="text-xs text-muted-foreground">Ontem</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Orçamento Mensal</CardTitle>
            <CardDescription>Progresso do seu orçamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Alimentação</p>
                  <p className="text-sm font-medium">65%</p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-primary/10 dark:bg-primary/20">
                  <div className="h-full w-[65%] rounded-full bg-primary"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Transporte</p>
                  <p className="text-sm font-medium">40%</p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-primary/10 dark:bg-primary/20">
                  <div className="h-full w-[40%] rounded-full bg-primary"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Lazer</p>
                  <p className="text-sm font-medium">85%</p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-primary/10 dark:bg-primary/20">
                  <div className="h-full w-[85%] rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
