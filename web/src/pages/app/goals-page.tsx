'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PlusIcon, Pencil, Trash2, Target } from 'lucide-react'
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
import { DatePicker } from '@/components/date-picker'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

// Dados de exemplo para metas financeiras
const initialGoals = [
  {
    id: 1,
    title: 'Viagem para Europa',
    description: 'Férias de 15 dias pela Europa',
    targetAmount: 15000,
    currentAmount: 8500,
    deadline: new Date('2024-12-31'),
    category: 'Viagem',
    priority: 'Alta',
    color: '#8B5CF6',
  },
  {
    id: 2,
    title: 'Comprar um carro',
    description: 'Carro novo para substituir o atual',
    targetAmount: 45000,
    currentAmount: 12000,
    deadline: new Date('2025-06-30'),
    category: 'Veículo',
    priority: 'Média',
    color: '#10B981',
  },
  {
    id: 3,
    title: 'Fundo de emergência',
    description: '6 meses de despesas guardadas',
    targetAmount: 30000,
    currentAmount: 18000,
    deadline: new Date('2024-09-30'),
    category: 'Reserva',
    priority: 'Alta',
    color: '#F97316',
  },
  {
    id: 4,
    title: 'Entrada para apartamento',
    description: 'Valor para entrada de um apartamento',
    targetAmount: 80000,
    currentAmount: 25000,
    deadline: new Date('2026-01-15'),
    category: 'Imóvel',
    priority: 'Média',
    color: '#06B6D4',
  },
]

// Categorias de metas
const goalCategories = [
  { id: 1, name: 'Viagem', color: '#8B5CF6' },
  { id: 2, name: 'Veículo', color: '#10B981' },
  { id: 3, name: 'Imóvel', color: '#06B6D4' },
  { id: 4, name: 'Educação', color: '#3B82F6' },
  { id: 5, name: 'Reserva', color: '#F97316' },
  { id: 6, name: 'Aposentadoria', color: '#EF4444' },
  { id: 7, name: 'Outro', color: '#EC4899' },
]

// Prioridades
const priorities = [
  { id: 1, name: 'Alta', color: '#EF4444' },
  { id: 2, name: 'Média', color: '#F97316' },
  { id: 3, name: 'Baixa', color: '#10B981' },
]

export function GoalsPage() {
  const [goals, setGoals] = useState(initialGoals)
  const [isNewGoalOpen, setIsNewGoalOpen] = useState(false)
  const [isEditGoalOpen, setIsEditGoalOpen] = useState(false)
  const [isDepositOpen, setIsDepositOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<any>(null)
  const [depositAmount, setDepositAmount] = useState('')
  //   const { toast } = useToast()

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetAmount: '',
    currentAmount: '',
    deadline: undefined as Date | undefined,
    category: '',
    priority: '',
  })

  // Função para abrir o modal de edição de meta
  const openEditGoal = (goal: any) => {
    setSelectedGoal(goal)
    setNewGoal({
      title: goal.title,
      description: goal.description,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      deadline: goal.deadline,
      category: goal.category,
      priority: goal.priority,
    })
    setIsEditGoalOpen(true)
  }

  // Função para abrir o modal de depósito
  const openDeposit = (goal: any) => {
    setSelectedGoal(goal)
    setDepositAmount('')
    setIsDepositOpen(true)
  }

  // Função para lidar com a criação de uma nova meta
  const handleCreateGoal = () => {
    // Validação básica
    if (
      !newGoal.title ||
      !newGoal.targetAmount ||
      !newGoal.deadline ||
      !newGoal.category ||
      !newGoal.priority
    ) {
      //   toast({
      //     title: 'Campos obrigatórios',
      //     description: 'Por favor, preencha todos os campos obrigatórios.',
      //     variant: 'destructive',
      //   })
      return
    }

    // Obter a cor da categoria
    const categoryColor =
      goalCategories.find((c) => c.name === newGoal.category)?.color ||
      '#3B82F6'

    // Criar nova meta
    const goal = {
      id: goals.length + 1,
      title: newGoal.title,
      description: newGoal.description,
      targetAmount: Number.parseFloat(newGoal.targetAmount),
      currentAmount: Number.parseFloat(newGoal.currentAmount || '0'),
      deadline: newGoal.deadline,
      category: newGoal.category,
      priority: newGoal.priority,
      color: categoryColor,
    }

    // Adicionar à lista de metas
    setGoals([...goals, goal])

    // Resetar o formulário e fechar o modal
    setNewGoal({
      title: '',
      description: '',
      targetAmount: '',
      currentAmount: '',
      deadline: undefined,
      category: '',
      priority: '',
    })
    setIsNewGoalOpen(false)

    // toast({
    //   title: 'Meta criada',
    //   description: 'Sua meta financeira foi criada com sucesso!',
    // })
  }

  // Função para lidar com a atualização de uma meta
  const handleUpdateGoal = () => {
    if (!selectedGoal) return

    // Validação básica
    if (
      !newGoal.title ||
      !newGoal.targetAmount ||
      !newGoal.deadline ||
      !newGoal.category ||
      !newGoal.priority
    ) {
      //   toast({
      //   })
      return
    }

    // Obter a cor da categoria
    const categoryColor =
      goalCategories.find((c) => c.name === newGoal.category)?.color ||
      '#3B82F6'

    // Atualizar meta
    const updatedGoals = goals.map((goal) => {
      if (goal.id === selectedGoal.id) {
        return {
          ...goal,
          title: newGoal.title,
          description: newGoal.description,
          targetAmount: Number.parseFloat(newGoal.targetAmount),
          currentAmount: Number.parseFloat(newGoal.currentAmount || '0'),
          deadline: newGoal.deadline,
          category: newGoal.category,
          priority: newGoal.priority,
          color: categoryColor,
        }
      }
      return goal
    })

    // Atualizar a lista de metas
    // setGoals(updatedGoals)

    // Resetar o formulário e fechar o modal
    setNewGoal({
      title: '',
      description: '',
      targetAmount: '',
      currentAmount: '',
      deadline: undefined,
      category: '',
      priority: '',
    })
    setIsEditGoalOpen(false)

    // toast({
    //   title: 'Meta atualizada',
    //   description: 'Sua meta financeira foi atualizada com sucesso!',
    // })
  }

  // Função para lidar com a exclusão de uma meta
  const handleDeleteGoal = (goalId: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta meta?')) {
      const updatedGoals = goals.filter((goal) => goal.id !== goalId)
      setGoals(updatedGoals)

      //   toast({
      //     title: 'Meta excluída',
      //     description: 'Sua meta financeira foi excluída com sucesso.',
      //   })
    }
  }

  // Função para lidar com o depósito em uma meta
  const handleDeposit = () => {
    if (!selectedGoal || !depositAmount) {
      //   toast({
      //     title: 'Valor inválido',
      //     description: 'Por favor, informe um valor válido para o depósito.',
      //     variant: 'destructive',
      //   })
      return
    }

    const amount = Number.parseFloat(depositAmount)
    if (isNaN(amount) || amount <= 0) {
      //   toast({
      //     title: 'Valor inválido',
      //     description: 'Por favor, informe um valor válido para o depósito.',
      //     variant: 'destructive',
      //   })
      return
    }

    // Atualizar meta
    const updatedGoals = goals.map((goal) => {
      if (goal.id === selectedGoal.id) {
        const newAmount = goal.currentAmount + amount
        return {
          ...goal,
          currentAmount:
            newAmount > goal.targetAmount ? goal.targetAmount : newAmount,
        }
      }
      return goal
    })

    // Atualizar a lista de metas
    setGoals(updatedGoals)

    // Resetar o formulário e fechar o modal
    setDepositAmount('')
    setIsDepositOpen(false)

    // toast({
    //   title: 'Depósito realizado',
    //   description: `Você adicionou R$ ${amount.toFixed(2)} à sua meta.`,
    // })
  }

  // Função para calcular o progresso da meta
  const calculateProgress = (current: number, target: number) => {
    return Math.min(100, Math.round((current / target) * 100))
  }

  // Função para formatar a data
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR')
  }

  // Função para obter a cor da prioridade
  const getPriorityColor = (priority: string) => {
    return priorities.find((p) => p.name === priority)?.color || '#10B981'
  }

  // Função para obter a variante do badge de prioridade
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'Alta':
        return 'danger'
      case 'Média':
        return 'warning'
      case 'Baixa':
        return 'success'
      default:
        return 'default'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Metas Financeiras
          </h1>
          <p className="text-muted-foreground">
            Defina e acompanhe suas metas financeiras
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsNewGoalOpen(true)}>
          <PlusIcon className="h-4 w-4" />
          Nova Meta
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => {
          const progress = calculateProgress(
            goal.currentAmount,
            goal.targetAmount,
          )
          const isCompleted = progress >= 100

          return (
            <Card
              key={goal.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-1" style={{ backgroundColor: goal.color }} />
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: goal.color }}
                    />
                    {goal.title}
                  </CardTitle>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openEditGoal(goal)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleDeleteGoal(goal.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </div>
                </div>
                <CardDescription>{goal.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge>{goal.priority}</Badge>
                  <Badge variant="outline">{goal.category}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>
                      R$ {goal.currentAmount.toFixed(2)} / R${' '}
                      {goal.targetAmount.toFixed(2)}
                    </span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-primary/10 dark:bg-primary/20">
                    <div
                      className={`h-full rounded-full transition-all ${isCompleted ? 'bg-emerald-500' : 'bg-primary'}`}
                      style={{
                        width: `${progress}%`,
                        backgroundColor: isCompleted ? undefined : goal.color,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Meta para: {formatDate(goal.deadline)}
                  </span>
                  <span className="text-muted-foreground">
                    Faltam: R${' '}
                    {(goal.targetAmount - goal.currentAmount).toFixed(2)}
                  </span>
                </div>

                <Separator />

                <Button
                  className="w-full gap-2"
                  onClick={() => openDeposit(goal)}
                  disabled={isCompleted}
                >
                  <PlusIcon className="h-4 w-4" />
                  {isCompleted ? 'Meta Concluída!' : 'Adicionar Valor'}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Modal para Nova Meta */}
      <Dialog open={isNewGoalOpen} onOpenChange={setIsNewGoalOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Nova Meta Financeira</DialogTitle>
            <DialogDescription>
              Defina uma nova meta para organizar suas finanças.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Título
              </Label>
              <Input
                id="title"
                placeholder="Ex: Viagem para Europa"
                className="col-span-3"
                value={newGoal.title}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, title: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Input
                id="description"
                placeholder="Descrição da meta"
                className="col-span-3"
                value={newGoal.description}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, description: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="targetAmount" className="text-right">
                Valor Total (R$)
              </Label>
              <Input
                id="targetAmount"
                type="number"
                placeholder="0,00"
                className="col-span-3"
                value={newGoal.targetAmount}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, targetAmount: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="currentAmount" className="text-right">
                Valor Inicial (R$)
              </Label>
              <Input
                id="currentAmount"
                type="number"
                placeholder="0,00"
                className="col-span-3"
                value={newGoal.currentAmount}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, currentAmount: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deadline" className="text-right">
                Data Limite
              </Label>
              <div className="col-span-3">
                <DatePicker
                  date={newGoal.deadline}
                  setDate={(date) => setNewGoal({ ...newGoal, deadline: date })}
                  placeholder="Selecione a data limite"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Categoria
              </Label>
              <div className="col-span-3">
                <select
                  id="category"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={newGoal.category}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, category: e.target.value })
                  }
                >
                  <option value="">Selecione uma categoria</option>
                  {goalCategories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Prioridade
              </Label>
              <div className="col-span-3">
                <select
                  id="priority"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={newGoal.priority}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, priority: e.target.value })
                  }
                >
                  <option value="">Selecione a prioridade</option>
                  {priorities.map((priority) => (
                    <option key={priority.id} value={priority.name}>
                      {priority.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewGoalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateGoal}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Editar Meta */}
      <Dialog open={isEditGoalOpen} onOpenChange={setIsEditGoalOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Editar Meta Financeira</DialogTitle>
            <DialogDescription>
              Atualize as informações da sua meta financeira.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">
                Título
              </Label>
              <Input
                id="edit-title"
                placeholder="Ex: Viagem para Europa"
                className="col-span-3"
                value={newGoal.title}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, title: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">
                Descrição
              </Label>
              <Input
                id="edit-description"
                placeholder="Descrição da meta"
                className="col-span-3"
                value={newGoal.description}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, description: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-targetAmount" className="text-right">
                Valor Total (R$)
              </Label>
              <Input
                id="edit-targetAmount"
                type="number"
                placeholder="0,00"
                className="col-span-3"
                value={newGoal.targetAmount}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, targetAmount: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-currentAmount" className="text-right">
                Valor Atual (R$)
              </Label>
              <Input
                id="edit-currentAmount"
                type="number"
                placeholder="0,00"
                className="col-span-3"
                value={newGoal.currentAmount}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, currentAmount: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-deadline" className="text-right">
                Data Limite
              </Label>
              <div className="col-span-3">
                <DatePicker
                  date={newGoal.deadline}
                  setDate={(date) => setNewGoal({ ...newGoal, deadline: date })}
                  placeholder="Selecione a data limite"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-category" className="text-right">
                Categoria
              </Label>
              <div className="col-span-3">
                <select
                  id="edit-category"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={newGoal.category}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, category: e.target.value })
                  }
                >
                  <option value="">Selecione uma categoria</option>
                  {goalCategories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-priority" className="text-right">
                Prioridade
              </Label>
              <div className="col-span-3">
                <select
                  id="edit-priority"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={newGoal.priority}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, priority: e.target.value })
                  }
                >
                  <option value="">Selecione a prioridade</option>
                  {priorities.map((priority) => (
                    <option key={priority.id} value={priority.name}>
                      {priority.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditGoalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateGoal}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Depósito */}
      <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Valor à Meta</DialogTitle>
            <DialogDescription>
              Adicione um valor para avançar em direção à sua meta.
            </DialogDescription>
          </DialogHeader>
          {selectedGoal && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${selectedGoal.color}20` }}
                >
                  <Target
                    className="h-6 w-6"
                    style={{ color: selectedGoal.color }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedGoal.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    R$ {selectedGoal.currentAmount.toFixed(2)} de R${' '}
                    {selectedGoal.targetAmount.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deposit-amount">Valor a adicionar (R$)</Label>
                <Input
                  id="deposit-amount"
                  type="number"
                  placeholder="0,00"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
              </div>

              <div className="rounded-lg border border-border/50 p-4 dark:border-border/30">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Progresso atual:
                    </span>
                    <span className="text-sm font-medium">
                      {calculateProgress(
                        selectedGoal.currentAmount,
                        selectedGoal.targetAmount,
                      )}
                      %
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-primary/10 dark:bg-primary/20">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${calculateProgress(selectedGoal.currentAmount, selectedGoal.targetAmount)}%`,
                        backgroundColor: selectedGoal.color,
                      }}
                    ></div>
                  </div>
                </div>

                {depositAmount &&
                  !isNaN(Number(depositAmount)) &&
                  Number(depositAmount) > 0 && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Progresso após depósito:
                        </span>
                        <span className="text-sm font-medium">
                          {calculateProgress(
                            selectedGoal.currentAmount + Number(depositAmount),
                            selectedGoal.targetAmount,
                          )}
                          %
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-primary/10 dark:bg-primary/20">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${calculateProgress(
                              selectedGoal.currentAmount +
                                Number(depositAmount),
                              selectedGoal.targetAmount,
                            )}%`,
                            backgroundColor: selectedGoal.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDepositOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleDeposit}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
