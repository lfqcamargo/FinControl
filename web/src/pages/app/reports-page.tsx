import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CalendarIcon, DownloadIcon, FilterIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export function ReportsPage() {
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
  const [isDateRangeDialogOpen, setIsDateRangeDialogOpen] = useState(false)
  const [filters, setFilters] = useState({
    period: 'month',
    category: 'all',
  })

  // Dados de exemplo para categorias
  const categories = [
    {
      id: 1,
      name: 'Alimentação',
      color: '#F97316',
      value: 650,
      percentage: 22,
    },
    { id: 2, name: 'Moradia', color: '#8B5CF6', value: 1200, percentage: 41 },
    { id: 3, name: 'Transporte', color: '#06B6D4', value: 320, percentage: 11 },
    { id: 4, name: 'Outros', color: '#10B981', value: 730, percentage: 26 },
  ]

  // Dados de exemplo para receitas e despesas
  const financialData = {
    income: 6500,
    expense: 2900,
    balance: 3600,
  }

  // Dados de exemplo para tendência de gastos
  const monthlyExpenses = [
    { month: 'Janeiro', value: 2800 },
    { month: 'Fevereiro', value: 3100 },
    { month: 'Março', value: 2950 },
    { month: 'Abril', value: 3200 },
    { month: 'Maio', value: 2750 },
    { month: 'Junho', value: 2900 },
  ]

  // Função para aplicar filtros
  const applyFilters = () => {
    console.log('Aplicando filtros:', filters)
    setIsFilterDialogOpen(false)
  }

  // Função para aplicar período
  const applyDateRange = () => {
    console.log('Aplicando período:', filters.period)
    setIsDateRangeDialogOpen(false)
  }

  // Função para exportar relatórios
  const exportReports = () => {
    alert('Funcionalidade de exportação será implementada em breve!')
  }

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
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setIsFilterDialogOpen(true)}
          >
            <FilterIcon className="h-4 w-4" />
            Filtros
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setIsDateRangeDialogOpen(true)}
          >
            <CalendarIcon className="h-4 w-4" />
            Período
          </Button>
          <Button className="gap-2" onClick={exportReports}>
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
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <span className="text-sm">
                    R$ {category.value.toFixed(2)} ({category.percentage}%)
                  </span>
                </div>
              ))}
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
                <span className="text-sm">
                  R$ {financialData.income.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500" />
                  <span className="text-sm">Despesas</span>
                </div>
                <span className="text-sm">
                  R$ {financialData.expense.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-muted/50 p-2 dark:bg-muted/30">
                <span className="font-medium">Saldo</span>
                <span className="font-medium text-emerald-500">
                  + R$ {financialData.balance.toFixed(2)}
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
              {monthlyExpenses.map((month, index) => (
                <div
                  key={month.month}
                  className={`rounded-md ${
                    index === monthlyExpenses.length - 1
                      ? 'bg-primary/10 dark:bg-primary/20'
                      : 'bg-muted/50 dark:bg-muted/30'
                  } p-3 text-center`}
                >
                  <p className="text-xs text-muted-foreground">{month.month}</p>
                  <p className="font-medium">R$ {month.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal para Filtros */}
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filtros</DialogTitle>
            <DialogDescription>
              Selecione os filtros para personalizar seus relatórios.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select
                value={filters.category}
                onValueChange={(value) =>
                  setFilters({ ...filters, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.name.toLowerCase()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsFilterDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={applyFilters}>Aplicar Filtros</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Período */}
      <Dialog
        open={isDateRangeDialogOpen}
        onOpenChange={setIsDateRangeDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Selecionar Período</DialogTitle>
            <DialogDescription>
              Escolha o período para visualizar seus relatórios.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Período</Label>
              <Select
                value={filters.period}
                onValueChange={(value) =>
                  setFilters({ ...filters, period: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mês</SelectItem>
                  <SelectItem value="quarter">Último trimestre</SelectItem>
                  <SelectItem value="year">Último ano</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {filters.period === 'custom' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data inicial</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Data final</Label>
                  <Input type="date" />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDateRangeDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={applyDateRange}>Aplicar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
