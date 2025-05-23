import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PlusIcon, Pencil } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Dados de exemplo para orçamentos mensais
const initialBudgets = [
  {
    id: 1,
    category: 'Alimentação',
    color: '#F97316',
    limit: 800,
    spent: 650,
    remaining: 150,
    percentage: 81,
  },
  {
    id: 2,
    category: 'Moradia',
    color: '#8B5CF6',
    limit: 1500,
    spent: 1200,
    remaining: 300,
    percentage: 80,
  },
  {
    id: 3,
    category: 'Transporte',
    color: '#06B6D4',
    limit: 400,
    spent: 320,
    remaining: 80,
    percentage: 80,
  },
  {
    id: 4,
    category: 'Lazer',
    color: '#10B981',
    limit: 300,
    spent: 280,
    remaining: 20,
    percentage: 93,
  },
  {
    id: 5,
    category: 'Saúde',
    color: '#EF4444',
    limit: 500,
    spent: 150,
    remaining: 350,
    percentage: 30,
  },
  {
    id: 6,
    category: 'Educação',
    color: '#3B82F6',
    limit: 300,
    spent: 300,
    remaining: 0,
    percentage: 100,
  },
]

// Dados de exemplo para categorias
const categoriesData = [
  { id: 1, name: 'Alimentação', color: '#F97316' },
  { id: 2, name: 'Moradia', color: '#8B5CF6' },
  { id: 3, name: 'Transporte', color: '#06B6D4' },
  { id: 4, name: 'Lazer', color: '#10B981' },
  { id: 5, name: 'Saúde', color: '#EF4444' },
  { id: 6, name: 'Educação', color: '#3B82F6' },
  { id: 7, name: 'Vestuário', color: '#EC4899' },
  { id: 8, name: 'Utilidades', color: '#F59E0B' },
]

export function BudgetsPage() {
  const [budgets, setBudgets] = useState(initialBudgets)
  const [isNewBudgetOpen, setIsNewBudgetOpen] = useState(false)
  const [isEditBudgetOpen, setIsEditBudgetOpen] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState<any>(null)
  const [newBudget, setNewBudget] = useState({
    category: '',
    limit: '',
  })

  // Calcular totais
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.limit, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)
  const totalRemaining = totalBudget - totalSpent

  // Função para abrir o modal de edição de orçamento
  const openEditBudget = (budget: any) => {
    setSelectedBudget(budget)
    setNewBudget({
      category: budget.category,
      limit: budget.limit.toString(),
    })
    setIsEditBudgetOpen(true)
  }

  // Função para lidar com a criação de um novo orçamento
  const handleCreateBudget = () => {
    // Validação básica
    if (!newBudget.category || !newBudget.limit) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    // Verificar se já existe um orçamento para esta categoria
    const existingBudget = budgets.find(
      (b) => b.category === newBudget.category,
    )
    if (existingBudget) {
      alert('Já existe um orçamento para esta categoria.')
      return
    }

    // Obter a cor da categoria
    const categoryColor =
      categoriesData.find((c) => c.name === newBudget.category)?.color ||
      '#3B82F6'

    // Criar novo orçamento
    const limit = Number.parseFloat(newBudget.limit)
    const budget = {
      id: budgets.length + 1,
      category: newBudget.category,
      color: categoryColor,
      limit: limit,
      spent: 0,
      remaining: limit,
      percentage: 0,
    }

    // Adicionar à lista de orçamentos
    setBudgets([...budgets, budget])

    // Resetar o formulário e fechar o modal
    setNewBudget({
      category: '',
      limit: '',
    })
    setIsNewBudgetOpen(false)
  }

  // Função para lidar com a atualização de um orçamento
  const handleUpdateBudget = () => {
    if (!selectedBudget) return

    // Validação básica
    if (!newBudget.limit) {
      alert('Por favor, preencha o valor do orçamento.')
      return
    }

    // Atualizar orçamento
    const limit = Number.parseFloat(newBudget.limit)
    const updatedBudgets = budgets.map((budget) => {
      if (budget.id === selectedBudget.id) {
        const spent = budget.spent
        const remaining = limit - spent
        const percentage = Math.round((spent / limit) * 100)

        return {
          ...budget,
          limit: limit,
          remaining: remaining,
          percentage: percentage,
        }
      }
      return budget
    })

    // Atualizar a lista de orçamentos
    setBudgets(updatedBudgets)

    // Resetar o formulário e fechar o modal
    setNewBudget({
      category: '',
      limit: '',
    })
    setIsEditBudgetOpen(false)
  }

  const currentMonth = new Date().toLocaleString('pt-BR', { month: 'long' })
  const currentYear = new Date().getFullYear()

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orçamentos</h1>
          <p className="text-muted-foreground">
            Gerencie seus limites de gastos por categoria
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsNewBudgetOpen(true)}>
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
              <div key={budget.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: budget.color }}
                    />
                    <span className="font-medium">{budget.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {budget.percentage}% • R$ {budget.spent.toFixed(2)} / R${' '}
                      {budget.limit.toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openEditBudget(budget)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                  </div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-primary/10 dark:bg-primary/20">
                  <div
                    className={`h-full rounded-full transition-all ${
                      budget.percentage > 90 ? 'bg-destructive' : 'bg-primary'
                    }`}
                    style={{
                      width: `${budget.percentage}%`,
                      backgroundColor: budget.color,
                    }}
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
                  <p className="text-xl font-bold">
                    R$ {totalBudget.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 dark:bg-muted/30">
                  <p className="text-sm text-muted-foreground">Gasto Atual</p>
                  <p className="text-xl font-bold">
                    R$ {totalSpent.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 dark:bg-muted/30">
                  <p className="text-sm text-muted-foreground">Restante</p>
                  <p className="text-xl font-bold">
                    R$ {totalRemaining.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal para Novo Orçamento */}
      <Dialog open={isNewBudgetOpen} onOpenChange={setIsNewBudgetOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Novo Orçamento</DialogTitle>
            <DialogDescription>
              Adicione um novo orçamento para uma categoria.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Categoria
              </Label>
              <div className="col-span-3">
                <Select
                  value={newBudget.category}
                  onValueChange={(value) =>
                    setNewBudget({ ...newBudget, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesData
                      .filter(
                        (category) =>
                          !budgets.some((b) => b.category === category.name),
                      )
                      .map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          <div className="flex items-center gap-2">
                            <div
                              className="h-3 w-3 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                            <span>{category.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="limit" className="text-right">
                Valor (R$)
              </Label>
              <Input
                id="limit"
                type="number"
                placeholder="0,00"
                className="col-span-3"
                value={newBudget.limit}
                onChange={(e) =>
                  setNewBudget({ ...newBudget, limit: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewBudgetOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateBudget}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Editar Orçamento */}
      <Dialog open={isEditBudgetOpen} onOpenChange={setIsEditBudgetOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Orçamento</DialogTitle>
            <DialogDescription>
              Atualize o valor do orçamento para {selectedBudget?.category}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-limit" className="text-right">
                Valor (R$)
              </Label>
              <Input
                id="edit-limit"
                type="number"
                placeholder="0,00"
                className="col-span-3"
                value={newBudget.limit}
                onChange={(e) =>
                  setNewBudget({ ...newBudget, limit: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditBudgetOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleUpdateBudget}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
