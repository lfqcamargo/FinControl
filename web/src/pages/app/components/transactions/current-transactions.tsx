import { fetchTransactions } from '@/api/transactions/fetch-transactions'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import {
  ArrowDownIcon,
  CalendarIcon,
  FilterIcon,
  SearchIcon,
} from 'lucide-react'
import { useState } from 'react'
import { EditTransaction } from './edit-transaction'

export function CurrentTransactions() {
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false)
  const [isTransactionDetailsOpen, setIsTransactionDetailsOpen] =
    useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)

  const { data: transactionsData } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => fetchTransactions(),
    staleTime: 0,
  })

  const openTransactionDetails = (transaction: any) => {
    setSelectedTransaction(transaction)
    setIsTransactionDetailsOpen(true)
  }

  return (
    <>
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
            {transactionsData?.transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between rounded-lg border border-border/50 p-3 dark:border-border/30 hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => openTransactionDetails(transaction)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full bg-rose-500/10 dark:bg-rose-500/20`}
                  >
                    <ArrowDownIcon className="h-5 w-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.budgetId}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium text-rose-500`}>
                    {' - '}
                    R$ {Math.abs(transaction.value).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {/* {transaction.date} */}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {/* Mostrando {transactions.length} de {transactions.length} transações */}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                //   disabled={transactions.length < 10}
              >
                Próximo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedTransaction && (
        <EditTransaction
          open={isTransactionDetailsOpen}
          onOpenChange={setIsTransactionDetailsOpen}
          transaction={selectedTransaction}
          onClose={() => setIsTransactionDetailsOpen(false)}
        />
      )}
    </>
  )
}
