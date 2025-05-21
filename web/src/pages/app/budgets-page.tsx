import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PlusIcon } from 'lucide-react'

export function BudgetsPage() {
  // Dados de exemplo para orçamentos mensais
  const currentMonth = new Date().toLocaleString('pt-BR', { month: 'long' })
  const currentYear = new Date().getFullYear()

  const budgets = [
    {
      category: 'Alimentação',
      color: '#F97316',
      limit: 800,
      spent: 650,
      remaining: 150,
      percentage: 81,
    },
    {
      category: 'Moradia',
      color: '#8B5CF6',
      limit: 1500,
      spent: 1200,
      remaining: 300,
      percentage: 80,
    },
    {
      category: 'Transporte',
      color: '#06B6D4',
      limit: 400,
      spent: 320,
      remaining: 80,
      percentage: 80,
    },
    {
      category: 'Lazer',
      color: '#10B981',
      limit: 300,
      spent: 280,
      remaining: 20,
      percentage: 93,
    },
    {
      category: 'Saúde',
      color: '#EF4444',
      limit: 500,
      spent: 150,
      remaining: 350,
      percentage: 30,
    },
    {
      category: 'Educação',
      color: '#3B82F6',
      limit: 300,
      spent: 300,
      remaining: 0,
      percentage: 100,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orçamentos</h1>
          <p className="text-muted-foreground">
            Gerencie seus limites de gastos por categoria
          </p>
        </div>
        <Button className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Novo Orçamento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Orçamento de {currentMonth} de {currentYear}
          </CardTitle>
          <CardDescription>
            Acompanhe o progresso do seu orçamento mensal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {budgets.map((budget) => (
              <div key={budget.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: budget.color }}
                    />
                    <span className="font-medium">{budget.category}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {budget.percentage}% • R$ {budget.spent.toFixed(2)} / R${' '}
                    {budget.limit.toFixed(2)}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-primary/10 dark:bg-primary/20">
                  <div
                    className={`h-full rounded-full transition-all ${
                      budget.percentage > 90 ? 'bg-destructive' : 'bg-primary'
                    }`}
                    style={{ width: `${budget.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-end">
                  <span className="text-xs text-muted-foreground">
                    Restante: R$ {budget.remaining.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-border/50 p-4 dark:border-border/30">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-semibold">Resumo do Orçamento</h3>
                <p className="text-sm text-muted-foreground">
                  Visão geral do seu orçamento mensal
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-muted/50 p-3 dark:bg-muted/30">
                  <p className="text-sm text-muted-foreground">
                    Orçamento Total
                  </p>
                  <p className="text-xl font-bold">R$ 3.800,00</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 dark:bg-muted/30">
                  <p className="text-sm text-muted-foreground">Gasto Atual</p>
                  <p className="text-xl font-bold">R$ 2.900,00</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 dark:bg-muted/30">
                  <p className="text-sm text-muted-foreground">Restante</p>
                  <p className="text-xl font-bold">R$ 900,00</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
