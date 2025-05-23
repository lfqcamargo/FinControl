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
import { Input } from '@/components/ui/input'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  FilterIcon,
  PlusIcon,
  SearchIcon,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

// Dados de exemplo para transações
const transactionsData = [
  {
    id: 1,
    description: 'Supermercado',
    category: 'Alimentação',
    amount: -350,
    date: 'Hoje, 14:30',
    type: 'expense',
    notes:
      'Compras semanais no Carrefour. Incluiu itens para o churrasco do final de semana.',
  },
  {
    id: 2,
    description: 'Salário',
    category: 'Receita',
    amount: 5000,
    date: 'Ontem, 08:15',
    type: 'income',
    notes: 'Salário mensal da empresa XYZ.',
  },
  {
    id: 3,
    description: 'Aluguel',
    category: 'Moradia',
    amount: -1200,
    date: '15/05/2023, 10:00',
    type: 'expense',
    notes: 'Pagamento mensal do aluguel do apartamento.',
  },
  {
    id: 4,
    description: 'Conta de Luz',
    category: 'Utilidades',
    amount: -180,
    date: '12/05/2023, 16:45',
    type: 'expense',
    notes: 'Fatura de energia elétrica do mês de abril.',
  },
  {
    id: 5,
    description: 'Freelance',
    category: 'Receita Extra',
    amount: 1500,
    date: '10/05/2023, 09:30',
    type: 'income',
    notes: 'Pagamento pelo projeto de design para o cliente ABC.',
  },
]

// Dados de exemplo para categorias
const categoriesData = [
  { id: 1, name: 'Alimentação', type: 'expense' },
  { id: 2, name: 'Moradia', type: 'expense' },
  { id: 3, name: 'Transporte', type: 'expense' },
  { id: 4, name: 'Lazer', type: 'expense' },
  { id: 5, name: 'Saúde', type: 'expense' },
  { id: 6, name: 'Educação', type: 'expense' },
  { id: 7, name: 'Utilidades', type: 'expense' },
  { id: 8, name: 'Receita', type: 'income' },
  { id: 9, name: 'Receita Extra', type: 'income' },
]

export function TransactionsPage() {
  const [transactions, setTransactions] = useState(transactionsData)
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false)
  const [isTransactionDetailsOpen, setIsTransactionDetailsOpen] =
    useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'expense',
    notes: '',
  })

  // Função para abrir o modal de detalhes da transação
  const openTransactionDetails = (transaction: any) => {
    setSelectedTransaction(transaction)
    setIsTransactionDetailsOpen(true)
  }

  // Função para lidar com a criação de uma nova transação
  const handleCreateTransaction = () => {
    // Validação básica
    if (
      !newTransaction.description ||
      !newTransaction.amount ||
      !newTransaction.category
    ) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    // Criar nova transação
    const amount =
      newTransaction.type === 'expense'
        ? -Math.abs(Number.parseFloat(newTransaction.amount))
        : Math.abs(Number.parseFloat(newTransaction.amount))

    const transaction = {
      id: transactions.length + 1,
      description: newTransaction.description,
      category: newTransaction.category,
      amount: amount,
      date: new Date().toLocaleString('pt-BR'),
      type: newTransaction.type,
      notes: newTransaction.notes,
    }

    // Adicionar à lista de transações
    setTransactions([transaction, ...transactions])

    // Resetar o formulário e fechar o modal
    setNewTransaction({
      description: '',
      amount: '',
      category: '',
      type: 'expense',
      notes: '',
    })
    setIsNewTransactionOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transações</h1>
          <p className="text-muted-foreground">
            Gerencie suas receitas e despesas
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsNewTransactionOpen(true)}>
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
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between rounded-lg border border-border/50 p-3 dark:border-border/30 hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => openTransactionDetails(transaction)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      transaction.type === 'expense'
                        ? 'bg-rose-500/10 dark:bg-rose-500/20'
                        : 'bg-emerald-500/10 dark:bg-emerald-500/20'
                    }`}
                  >
                    {transaction.type === 'expense' ? (
                      <ArrowDownIcon className="h-5 w-5 text-rose-500" />
                    ) : (
                      <ArrowUpIcon className="h-5 w-5 text-emerald-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${transaction.amount < 0 ? 'text-rose-500' : 'text-emerald-500'}`}
                  >
                    {transaction.amount < 0 ? '- ' : '+ '}
                    R$ {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.date}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Mostrando {transactions.length} de {transactions.length}{' '}
              transações
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={transactions.length < 10}
              >
                Próximo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal para Nova Transação */}
      <Dialog
        open={isNewTransactionOpen}
        onOpenChange={setIsNewTransactionOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nova Transação</DialogTitle>
            <DialogDescription>
              Adicione uma nova transação ao seu controle financeiro.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="transaction-type" className="text-right">
                Tipo
              </Label>
              <div className="col-span-3">
                <Select
                  value={newTransaction.type}
                  onValueChange={(value) =>
                    setNewTransaction({ ...newTransaction, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expense">Despesa</SelectItem>
                    <SelectItem value="income">Receita</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Input
                id="description"
                placeholder="Ex: Supermercado"
                className="col-span-3"
                value={newTransaction.description}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Valor (R$)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0,00"
                className="col-span-3"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    amount: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Categoria
              </Label>
              <div className="col-span-3">
                <Select
                  value={newTransaction.category}
                  onValueChange={(value) =>
                    setNewTransaction({ ...newTransaction, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesData
                      .filter(
                        (category) => category.type === newTransaction.type,
                      )
                      .map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Observações
              </Label>
              <Textarea
                id="notes"
                placeholder="Detalhes adicionais sobre a transação"
                className="col-span-3"
                value={newTransaction.notes}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    notes: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewTransactionOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleCreateTransaction}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Detalhes da Transação */}
      <Dialog
        open={isTransactionDetailsOpen}
        onOpenChange={setIsTransactionDetailsOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Transação</DialogTitle>
            <DialogDescription>
              Informações detalhadas sobre a transação selecionada.
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    selectedTransaction.type === 'expense'
                      ? 'bg-rose-500/10 dark:bg-rose-500/20'
                      : 'bg-emerald-500/10 dark:bg-emerald-500/20'
                  }`}
                >
                  {selectedTransaction.type === 'expense' ? (
                    <ArrowDownIcon className="h-6 w-6 text-rose-500" />
                  ) : (
                    <ArrowUpIcon className="h-6 w-6 text-emerald-500" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedTransaction.description}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedTransaction.category}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-border/50 p-4 dark:border-border/30">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Valor:
                  </span>
                  <span
                    className={`text-lg font-bold ${
                      selectedTransaction.amount < 0
                        ? 'text-rose-500'
                        : 'text-emerald-500'
                    }`}
                  >
                    {selectedTransaction.amount < 0 ? '- ' : '+ '}
                    R$ {Math.abs(selectedTransaction.amount).toFixed(2)}
                  </span>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Data:
                  </span>
                  <span className="text-sm">{selectedTransaction.date}</span>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Tipo:
                  </span>
                  <span className="text-sm capitalize">
                    {selectedTransaction.type === 'expense'
                      ? 'Despesa'
                      : 'Receita'}
                  </span>
                </div>
                {selectedTransaction.notes && (
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Observações:
                    </span>
                    <p className="rounded-md bg-muted/50 p-3 text-sm dark:bg-muted/30">
                      {selectedTransaction.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsTransactionDetailsOpen(false)}
            >
              Fechar
            </Button>
            <Button variant="destructive">Excluir</Button>
            <Button>Editar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
