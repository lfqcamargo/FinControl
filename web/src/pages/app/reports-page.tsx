import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CalendarIcon, DownloadIcon, FilterIcon } from 'lucide-react'

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">
            Analise seus dados financeiros
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FilterIcon className="h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            Período
          </Button>
          <Button className="gap-2">
            <DownloadIcon className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Despesas por Categoria</CardTitle>
            <CardDescription>
              Distribuição de gastos por categoria no mês atual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed border-border p-4 dark:border-border/50">
              <div className="text-center">
                <p className="text-muted-foreground">Gráfico de Pizza</p>
                <p className="text-xs text-muted-foreground">
                  (Aqui seria renderizado um gráfico de pizza com as despesas
                  por categoria)
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#F97316]" />
                  <span className="text-sm">Alimentação</span>
                </div>
                <span className="text-sm">R$ 650,00 (22%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#8B5CF6]" />
                  <span className="text-sm">Moradia</span>
                </div>
                <span className="text-sm">R$ 1.200,00 (41%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#06B6D4]" />
                  <span className="text-sm">Transporte</span>
                </div>
                <span className="text-sm">R$ 320,00 (11%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#10B981]" />
                  <span className="text-sm">Outros</span>
                </div>
                <span className="text-sm">R$ 730,00 (26%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receitas vs Despesas</CardTitle>
            <CardDescription>
              Comparação entre receitas e despesas nos últimos 6 meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed border-border p-4 dark:border-border/50">
              <div className="text-center">
                <p className="text-muted-foreground">Gráfico de Barras</p>
                <p className="text-xs text-muted-foreground">
                  (Aqui seria renderizado um gráfico de barras comparando
                  receitas e despesas)
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                  <span className="text-sm">Receitas</span>
                </div>
                <span className="text-sm">R$ 6.500,00</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500" />
                  <span className="text-sm">Despesas</span>
                </div>
                <span className="text-sm">R$ 2.900,00</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-muted/50 p-2 dark:bg-muted/30">
                <span className="font-medium">Saldo</span>
                <span className="font-medium text-emerald-500">
                  + R$ 3.600,00
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Tendência de Gastos</CardTitle>
            <CardDescription>
              Evolução dos seus gastos ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed border-border p-4 dark:border-border/50">
              <div className="text-center">
                <p className="text-muted-foreground">Gráfico de Linha</p>
                <p className="text-xs text-muted-foreground">
                  (Aqui seria renderizado um gráfico de linha mostrando a
                  tendência de gastos)
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
              <div className="rounded-md bg-muted/50 p-3 text-center dark:bg-muted/30">
                <p className="text-xs text-muted-foreground">Janeiro</p>
                <p className="font-medium">R$ 2.800</p>
              </div>
              <div className="rounded-md bg-muted/50 p-3 text-center dark:bg-muted/30">
                <p className="text-xs text-muted-foreground">Fevereiro</p>
                <p className="font-medium">R$ 3.100</p>
              </div>
              <div className="rounded-md bg-muted/50 p-3 text-center dark:bg-muted/30">
                <p className="text-xs text-muted-foreground">Março</p>
                <p className="font-medium">R$ 2.950</p>
              </div>
              <div className="rounded-md bg-muted/50 p-3 text-center dark:bg-muted/30">
                <p className="text-xs text-muted-foreground">Abril</p>
                <p className="font-medium">R$ 3.200</p>
              </div>
              <div className="rounded-md bg-muted/50 p-3 text-center dark:bg-muted/30">
                <p className="text-xs text-muted-foreground">Maio</p>
                <p className="font-medium">R$ 2.750</p>
              </div>
              <div className="rounded-md bg-primary/10 p-3 text-center dark:bg-primary/20">
                <p className="text-xs text-muted-foreground">Junho</p>
                <p className="font-medium">R$ 2.900</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
