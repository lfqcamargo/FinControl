import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { NewBudget } from './components/budgets/new-budget'
import { CurrentBudgets } from './components/budgets/current-budgets'
import { MonthYearPicker } from '@/components/date-picker'

export function BudgetsPage() {
  const [isNewBudgetOpen, setIsNewBudgetOpen] = useState(false)

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orçamentos</h1>
          <p className="text-muted-foreground">
            Gerencie seus limites de gastos por categoria
          </p>
        </div>
        <div className="flex gap-4">
          <MonthYearPicker
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onChange={(month, year) => {
              setSelectedMonth(month)
              setSelectedYear(year)
            }}
          />
          <Button className="gap-2" onClick={() => setIsNewBudgetOpen(true)}>
            <PlusIcon className="h-4 w-4" />
            Novo Orçamento
          </Button>
        </div>
      </div>

      <NewBudget open={isNewBudgetOpen} onOpenChange={setIsNewBudgetOpen} />
      <CurrentBudgets month={selectedMonth} year={selectedYear} />
    </div>
  )
}
