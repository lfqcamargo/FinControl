import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  FilterIcon,
  PlusIcon,
  SearchIcon,
} from 'lucide-react'

export function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transações</h1>
          <p className="text-muted-foreground">
            Gerencie suas receitas e despesas
          </p>
        </div>
        <Button className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Nova Transação
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <CardTitle>Histórico de Transações</CardTitle>
              <CardDescription>
                Visualize e filtre todas as suas transações
              </CardDescription>
            </div>
            <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
              <div className="relative w-full md:w-[240px]">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" placeholder="Buscar transação..." />
              </div>
              <Button variant="outline" className="gap-2">
                <FilterIcon className="h-4 w-4" />
                Filtros
              </Button>
              <Button variant="outline" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                Período
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Transação 1 */}
            <div className="flex items-center justify-between rounded-lg border border-border/50 p-3 dark:border-border/30">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-500/10 dark:bg-rose-500/20">
                  <ArrowDownIcon className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <p className="font-medium">Supermercado</p>
                  <p className="text-xs text-muted-foreground">Alimentação</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-rose-500">- R$ 350,00</p>
                <p className="text-xs text-muted-foreground">Hoje, 14:30</p>
              </div>
            </div>

            {/* Transação 2 */}
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
                <p className="text-xs text-muted-foreground">Ontem, 08:15</p>
              </div>
            </div>

            {/* Transação 3 */}
            <div className="flex items-center justify-between rounded-lg border border-border/50 p-3 dark:border-border/30">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-500/10 dark:bg-rose-500/20">
                  <ArrowDownIcon className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <p className="font-medium">Aluguel</p>
                  <p className="text-xs text-muted-foreground">Moradia</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-rose-500">- R$ 1.200,00</p>
                <p className="text-xs text-muted-foreground">
                  15/05/2023, 10:00
                </p>
              </div>
            </div>

            {/* Transação 4 */}
            <div className="flex items-center justify-between rounded-lg border border-border/50 p-3 dark:border-border/30">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-500/10 dark:bg-rose-500/20">
                  <ArrowDownIcon className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <p className="font-medium">Conta de Luz</p>
                  <p className="text-xs text-muted-foreground">Utilidades</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-rose-500">- R$ 180,00</p>
                <p className="text-xs text-muted-foreground">
                  12/05/2023, 16:45
                </p>
              </div>
            </div>

            {/* Transação 5 */}
            <div className="flex items-center justify-between rounded-lg border border-border/50 p-3 dark:border-border/30">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 dark:bg-emerald-500/20">
                  <ArrowUpIcon className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="font-medium">Freelance</p>
                  <p className="text-xs text-muted-foreground">Receita Extra</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-emerald-500">+ R$ 1.500,00</p>
                <p className="text-xs text-muted-foreground">
                  10/05/2023, 09:30
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Mostrando 5 de 24 transações
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm">
                Próximo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
