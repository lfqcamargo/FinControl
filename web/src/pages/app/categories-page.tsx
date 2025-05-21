import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PlusIcon } from 'lucide-react'

export function CategoriesPage() {
  // Dados de exemplo para categorias
  const categories = [
    { name: 'Alimentação', color: '#F97316', budget: 800, spent: 650 },
    { name: 'Moradia', color: '#8B5CF6', budget: 1500, spent: 1200 },
    { name: 'Transporte', color: '#06B6D4', budget: 400, spent: 320 },
    { name: 'Lazer', color: '#10B981', budget: 300, spent: 280 },
    { name: 'Saúde', color: '#EF4444', budget: 500, spent: 150 },
    { name: 'Educação', color: '#3B82F6', budget: 300, spent: 300 },
    { name: 'Vestuário', color: '#EC4899', budget: 200, spent: 120 },
    { name: 'Utilidades', color: '#F59E0B', budget: 600, spent: 580 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categorias</h1>
          <p className="text-muted-foreground">
            Gerencie as categorias de suas transações
          </p>
        </div>
        <Button className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Nova Categoria
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.name} className="overflow-hidden">
            <div className="h-1" style={{ backgroundColor: category.color }} />
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                {category.name}
              </CardTitle>
              <CardDescription>
                Orçamento: R$ {category.budget.toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Gasto: R$ {category.spent.toFixed(2)}</span>
                  <span className="font-medium">
                    {Math.round((category.spent / category.budget) * 100)}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-primary/10 dark:bg-primary/20">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{
                      width: `${Math.min(100, (category.spent / category.budget) * 100)}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-end">
                  <span className="text-xs text-muted-foreground">
                    Restante: R$ {(category.budget - category.spent).toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
