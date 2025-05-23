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
import { Calendar } from '@/components/ui/calendar'
import type { DateRange } from 'react-day-picker'
import { Badge } from '@/components/ui/badge'
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
import {
  PlusIcon,
  CalendarIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from 'lucide-react'
// import { useToast } from "@/components/ui/use-toast"

// Dados de exemplo para eventos financeiros
const initialEvents = [
  {
    id: 1,
    title: 'Pagamento de Aluguel',
    date: new Date(2024, 4, 10),
    amount: -1200,
    category: 'Moradia',
    description: 'Pagamento mensal do aluguel',
    type: 'expense',
    recurring: true,
    color: '#8B5CF6',
  },
  {
    id: 2,
    title: 'Recebimento de Salário',
    date: new Date(2024, 4, 5),
    amount: 5000,
    category: 'Receita',
    description: 'Salário mensal',
    type: 'income',
    recurring: true,
    color: '#10B981',
  },
  {
    id: 3,
    title: 'Conta de Luz',
    date: new Date(2024, 4, 15),
    amount: -180,
    category: 'Utilidades',
    description: 'Pagamento da conta de luz',
    type: 'expense',
    recurring: true,
    color: '#F97316',
  },
  {
    id: 4,
    title: 'Conta de Internet',
    date: new Date(2024, 4, 18),
    amount: -120,
    category: 'Utilidades',
    description: 'Pagamento da conta de internet',
    type: 'expense',
    recurring: true,
    color: '#F97316',
  },
  {
    id: 5,
    title: 'Freelance',
    date: new Date(2024, 4, 22),
    amount: 1500,
    category: 'Receita Extra',
    description: 'Pagamento de projeto freelance',
    type: 'income',
    recurring: false,
    color: '#22C55E',
  },
]

// Categorias de eventos
const eventCategories = [
  { id: 1, name: 'Moradia', color: '#8B5CF6' },
  { id: 2, name: 'Alimentação', color: '#F97316' },
  { id: 3, name: 'Transporte', color: '#06B6D4' },
  { id: 4, name: 'Utilidades', color: '#EF4444' },
  { id: 5, name: 'Lazer', color: '#10B981' },
  { id: 6, name: 'Saúde', color: '#3B82F6' },
  { id: 7, name: 'Receita', color: '#22C55E' },
  { id: 8, name: 'Receita Extra', color: '#22C55E' },
]

export function CalendarPage() {
  const [events, setEvents] = useState(initialEvents)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  })
  const [isNewEventOpen, setIsNewEventOpen] = useState(false)
  const [isViewEventOpen, setIsViewEventOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  //   const { toast } = useToast()

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date(),
    amount: '',
    category: '',
    description: '',
    type: 'expense',
    recurring: false,
  })

  // Função para obter eventos de um dia específico
  const getEventsForDay = (day: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      )
    })
  }

  // Função para obter eventos do mês atual
  const getCurrentMonthEvents = () => {
    if (!selectedDateRange?.from || !selectedDateRange?.to) return []

    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate >= selectedDateRange.from! &&
        eventDate <= selectedDateRange.to!
      )
    })
  }

  // Função para abrir o modal de visualização de evento
  const openViewEvent = (event: any) => {
    setSelectedEvent(event)
    setIsViewEventOpen(true)
  }

  // Função para lidar com a criação de um novo evento
  const handleCreateEvent = () => {
    // Validação básica
    if (
      !newEvent.title ||
      !newEvent.date ||
      !newEvent.amount ||
      !newEvent.category
    ) {
      //   toast({
      //     title: "Campos obrigatórios",
      //     description: "Por favor, preencha todos os campos obrigatórios.",
      //     variant: "destructive",
      //   })
      return
    }

    // Obter a cor da categoria
    const categoryColor =
      eventCategories.find((c) => c.name === newEvent.category)?.color ||
      '#3B82F6'

    // Criar novo evento
    const amount =
      newEvent.type === 'expense'
        ? -Math.abs(Number.parseFloat(newEvent.amount))
        : Math.abs(Number.parseFloat(newEvent.amount))

    const event = {
      id: events.length + 1,
      title: newEvent.title,
      date: newEvent.date,
      amount: amount,
      category: newEvent.category,
      description: newEvent.description,
      type: newEvent.type,
      recurring: newEvent.recurring,
      color: categoryColor,
    }

    // Adicionar à lista de eventos
    setEvents([...events, event])

    // Resetar o formulário e fechar o modal
    setNewEvent({
      title: '',
      date: new Date(),
      amount: '',
      category: '',
      description: '',
      type: 'expense',
      recurring: false,
    })
    setIsNewEventOpen(false)

    // toast({
    //   title: "Evento criado",
    //   description: "Seu evento financeiro foi criado com sucesso!",
    // })
  }

  // Função para formatar a data
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR')
  }

  // Função para renderizar os dias com eventos
  const renderDayContent = (day: Date) => {
    const dayEvents = getEventsForDay(day)
    if (dayEvents.length === 0) return null

    return (
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="flex gap-1 pb-1">
          {dayEvents.map((event) => (
            <div
              key={event.id}
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: event.color }}
            />
          ))}
        </div>
      </div>
    )
  }

  // Calcular totais para o mês selecionado
  const currentMonthEvents = getCurrentMonthEvents()
  const totalIncome = currentMonthEvents
    .filter((event) => event.type === 'income')
    .reduce((sum, event) => sum + event.amount, 0)

  const totalExpense = currentMonthEvents
    .filter((event) => event.type === 'expense')
    .reduce((sum, event) => sum + Math.abs(event.amount), 0)

  const balance = totalIncome - totalExpense

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Calendário Financeiro
          </h1>
          <p className="text-muted-foreground">
            Visualize e planeje seus eventos financeiros
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsNewEventOpen(true)}>
          <PlusIcon className="h-4 w-4" />
          Novo Evento
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        <Card>
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
            <CardDescription>
              Visualize seus eventos financeiros no calendário
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              components={{
                DayContent: ({ date }) => (
                  <div className="relative h-full w-full p-2">
                    <span>{date.getDate()}</span>
                    {renderDayContent(date)}
                  </div>
                ),
              }}
              modifiers={{
                hasEvent: (date) => getEventsForDay(date).length > 0,
              }}
              modifiersStyles={{
                hasEvent: {
                  fontWeight: 'bold',
                },
              }}
              onMonthChange={(month) => {
                setSelectedDateRange({
                  from: new Date(month.getFullYear(), month.getMonth(), 1),
                  to: new Date(month.getFullYear(), month.getMonth() + 1, 0),
                })
              }}
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Mês</CardTitle>
              <CardDescription>
                {selectedDateRange?.from && (
                  <>
                    {new Intl.DateTimeFormat('pt-BR', {
                      month: 'long',
                      year: 'numeric',
                    }).format(selectedDateRange.from)}
                  </>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-muted/50 p-3 dark:bg-muted/30">
                    <p className="text-sm text-muted-foreground">Receitas</p>
                    <p className="text-xl font-bold text-emerald-500">
                      R$ {totalIncome.toFixed(2)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 dark:bg-muted/30">
                    <p className="text-sm text-muted-foreground">Despesas</p>
                    <p className="text-xl font-bold text-rose-500">
                      R$ {totalExpense.toFixed(2)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 dark:bg-muted/30">
                    <p className="text-sm text-muted-foreground">Saldo</p>
                    <p
                      className={`text-xl font-bold ${balance >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}
                    >
                      R$ {balance.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eventos do Dia</CardTitle>
              <CardDescription>
                {selectedDate && formatDate(selectedDate)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedDate && getEventsForDay(selectedDate).length > 0 ? (
                  getEventsForDay(selectedDate).map((event) => (
                    <div
                      key={event.id}
                      className="flex cursor-pointer items-center justify-between rounded-lg border border-border/50 p-3 hover:bg-muted/50 dark:border-border/30"
                      onClick={() => openViewEvent(event)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full ${
                            event.type === 'expense'
                              ? 'bg-rose-500/10 dark:bg-rose-500/20'
                              : 'bg-emerald-500/10 dark:bg-emerald-500/20'
                          }`}
                        >
                          {event.type === 'expense' ? (
                            <ArrowDownIcon className="h-5 w-5 text-rose-500" />
                          ) : (
                            <ArrowUpIcon className="h-5 w-5 text-emerald-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {event.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-medium ${event.type === 'expense' ? 'text-rose-500' : 'text-emerald-500'}`}
                        >
                          {event.type === 'expense' ? '- ' : '+ '}
                          R$ {Math.abs(event.amount).toFixed(2)}
                        </p>
                        {event.recurring && (
                          <Badge variant="outline" className="text-xs">
                            Recorrente
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <CalendarIcon className="mb-2 h-10 w-10 text-muted-foreground/50" />
                    <p className="text-muted-foreground">
                      Nenhum evento para este dia
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setIsNewEventOpen(true)}
                    >
                      Adicionar Evento
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal para Novo Evento */}
      <Dialog open={isNewEventOpen} onOpenChange={setIsNewEventOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Novo Evento Financeiro</DialogTitle>
            <DialogDescription>
              Adicione um novo evento ao seu calendário financeiro.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-type" className="text-right">
                Tipo
              </Label>
              <div className="col-span-3">
                <select
                  id="event-type"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={newEvent.type}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      type: e.target.value as 'expense' | 'income',
                    })
                  }
                >
                  <option value="expense">Despesa</option>
                  <option value="income">Receita</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Título
              </Label>
              <Input
                id="title"
                placeholder="Ex: Pagamento de Aluguel"
                className="col-span-3"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Data
              </Label>
              <div className="col-span-3">
                <DatePicker
                  date={newEvent.date}
                  setDate={(date) =>
                    setNewEvent({ ...newEvent, date: date || new Date() })
                  }
                  placeholder="Selecione a data do evento"
                />
              </div>
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
                value={newEvent.amount}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, amount: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Categoria
              </Label>
              <div className="col-span-3">
                <select
                  id="category"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={newEvent.category}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, category: e.target.value })
                  }
                >
                  <option value="">Selecione uma categoria</option>
                  {eventCategories
                    .filter((category) =>
                      newEvent.type === 'expense'
                        ? !category.name.includes('Receita')
                        : category.name.includes('Receita'),
                    )
                    .map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Input
                id="description"
                placeholder="Descrição do evento"
                className="col-span-3"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-1"></div>
              <div className="col-span-3 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="recurring"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={newEvent.recurring}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, recurring: e.target.checked })
                  }
                />
                <Label htmlFor="recurring" className="text-sm">
                  Evento recorrente (mensal)
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewEventOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateEvent}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Visualizar Evento */}
      <Dialog open={isViewEventOpen} onOpenChange={setIsViewEventOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalhes do Evento</DialogTitle>
            <DialogDescription>
              Informações detalhadas sobre o evento selecionado.
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    selectedEvent.type === 'expense'
                      ? 'bg-rose-500/10 dark:bg-rose-500/20'
                      : 'bg-emerald-500/10 dark:bg-emerald-500/20'
                  }`}
                >
                  {selectedEvent.type === 'expense' ? (
                    <ArrowDownIcon className="h-6 w-6 text-rose-500" />
                  ) : (
                    <ArrowUpIcon className="h-6 w-6 text-emerald-500" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedEvent.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent.category}
                    </p>
                    {selectedEvent.recurring && (
                      <Badge variant="outline" className="text-xs">
                        Recorrente
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border/50 p-4 dark:border-border/30">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Valor:
                  </span>
                  <span
                    className={`text-lg font-bold ${
                      selectedEvent.type === 'expense'
                        ? 'text-rose-500'
                        : 'text-emerald-500'
                    }`}
                  >
                    {selectedEvent.type === 'expense' ? '- ' : '+ '}
                    R$ {Math.abs(selectedEvent.amount).toFixed(2)}
                  </span>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Data:
                  </span>
                  <span className="text-sm">
                    {formatDate(new Date(selectedEvent.date))}
                  </span>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Tipo:
                  </span>
                  <span className="text-sm capitalize">
                    {selectedEvent.type === 'expense' ? 'Despesa' : 'Receita'}
                  </span>
                </div>
                {selectedEvent.description && (
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Descrição:
                    </span>
                    <p className="rounded-md bg-muted/50 p-3 text-sm dark:bg-muted/30">
                      {selectedEvent.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewEventOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
