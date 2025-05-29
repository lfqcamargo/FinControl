import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i)

interface MonthYearPickerProps {
  selectedMonth: number
  selectedYear: number
  onChange: (month: number, year: number) => void
}

export function MonthYearPicker({
  selectedMonth,
  selectedYear,
  onChange,
}: MonthYearPickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          {months[selectedMonth - 1]} / {selectedYear}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2 space-y-2">
        <div className="grid grid-cols-3 gap-2">
          {months.map((month, index) => (
            <Button
              key={month}
              variant={selectedMonth === index + 1 ? 'default' : 'ghost'}
              size="sm"
              onClick={() => {
                onChange(index + 1, selectedYear)
                setOpen(false)
              }}
            >
              {month.slice(0, 3)}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 justify-center pt-2 border-t">
          {years.map((year) => (
            <Button
              key={year}
              variant={selectedYear === year ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onChange(selectedMonth, year)}
            >
              {year}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
