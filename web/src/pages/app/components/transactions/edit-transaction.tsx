import type { Transaction } from '@/api/transactions/fetch-transactions'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ArrowDownIcon } from 'lucide-react'

interface EditTransactionProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction: Transaction
  onClose: () => void
}

export function EditTransaction({
  open,
  onOpenChange,
  transaction,
  onClose,
}: EditTransactionProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detalhes da Transação</DialogTitle>
          <DialogDescription>
            Informações detalhadas sobre a transação selecionada.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/10 dark:bg-rose-500/20">
              <ArrowDownIcon className="h-6 w-6 text-rose-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {transaction.description}
              </h3>
              <p className="text-sm text-muted-foreground">
                ID: {transaction.id}
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
                  transaction.value < 0 ? 'text-rose-500' : 'text-emerald-500'
                }`}
              >
                {transaction.value < 0 ? '- ' : '+ '}
                R$ {Math.abs(transaction.value).toFixed(2)}
              </span>
            </div>

            {transaction.observation && (
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Observações:
                </span>
                <p className="rounded-md bg-muted/50 p-3 text-sm dark:bg-muted/30">
                  {transaction.observation}
                </p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button variant="destructive">Excluir</Button>
          <Button>Editar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
