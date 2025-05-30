'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

import { PlusIcon } from 'lucide-react'

import { NewTransaction } from './components/transactions/new-transaction'
import { CurrentTransactions } from './components/transactions/current-transactions'

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

export function TransactionsPage() {
  const [transactions, setTransactions] = useState(transactionsData)
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false)

  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)

  // Função para abrir o modal de detalhes da transação

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

      <NewTransaction
        open={isNewTransactionOpen}
        onOpenChange={setIsNewTransactionOpen}
      />

      <CurrentTransactions />
    </div>
  )
}
