import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { fetchBudgets } from '@/api/fetch-budgets'
import { EditBudget } from './edit-budget'
import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface CurrentBudgetsProps {
  month: number
  year: number
}

export function CurrentBudgets({
  month = new Date().getMonth() + 1,
  year = new Date().getFullYear(),
}: CurrentBudgetsProps) {
  const [editingBudgetId, setEditingBudgetId] = useState<number | null>(null)

  const { data: budgetsData } = useQuery({
    queryKey: ['budgets', month, year],
    queryFn: () => fetchBudgets({ month, year }),
    staleTime: 0,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orçamentos</CardTitle>
        <CardDescription>
          Acompanhe o progresso do seu orçamento mensal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {budgetsData?.budgets.map((budget) => (
            <div key={budget.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: budget.color }}
                  />
                  <span className="font-medium">{budget.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    R$ {budget.value.toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setEditingBudgetId(budget.id)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                  <EditBudget
                    open={editingBudgetId === budget.id}
                    onOpenChange={(open) =>
                      setEditingBudgetId(open ? budget.id : null)
                    }
                    id={budget.id}
                    title={budget.title}
                    value={budget.value}
                    color={budget.color}
                    date={budget.date}
                  />
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-primary/10 dark:bg-primary/20">
                {/* <div
                  className={`h-full rounded-full transition-all ${
                    budget.percentage > 90 ? 'bg-destructive' : 'bg-primary'
                  }`}
                  style={{
                    width: `${budget.percentage}%`,
                    backgroundColor: budget.color,
                  }}
                ></div> */}
              </div>
              <div className="flex justify-end">
                {/* <span className="text-xs text-muted-foreground">
                  Restante: R$ {budget.remaining.toFixed(2)}
                </span> */}
              </div>
            </div>
          )) ?? <Skeleton />}
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
                <p className="text-sm text-muted-foreground">Orçamento Total</p>
                <p className="text-xl font-bold">
                  R$ {budgetsData?.totalValue.toFixed(2)}
                </p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 dark:bg-muted/30">
                <p className="text-sm text-muted-foreground">Gasto Atual</p>
                <p className="text-xl font-bold">R$ {}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 dark:bg-muted/30">
                <p className="text-sm text-muted-foreground">Restante</p>
                <p className="text-xl font-bold">R$ {}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
