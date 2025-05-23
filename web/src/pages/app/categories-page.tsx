'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PlusIcon, Pencil, Trash2 } from 'lucide-react'
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

// Dados de exemplo para categorias
const initialCategories = [
  {
    id: 1,
    name: 'Alimentação',
    color: '#F97316',
    budget: 800,
    spent: 650,
    type: 'expense',
  },
  {
    id: 2,
    name: 'Moradia',
    color: '#8B5CF6',
    budget: 1500,
    spent: 1200,
    type: 'expense',
  },
  {
    id: 3,
    name: 'Transporte',
    color: '#06B6D4',
    budget: 400,
    spent: 320,
    type: 'expense',
  },
  {
    id: 4,
    name: 'Lazer',
    color: '#10B981',
    budget: 300,
    spent: 280,
    type: 'expense',
  },
  {
    id: 5,
    name: 'Saúde',
    color: '#EF4444',
    budget: 500,
    spent: 150,
    type: 'expense',
  },
  {
    id: 6,
    name: 'Educação',
    color: '#3B82F6',
    budget: 300,
    spent: 300,
    type: 'expense',
  },
  {
    id: 7,
    name: 'Vestuário',
    color: '#EC4899',
    budget: 200,
    spent: 120,
    type: 'expense',
  },
  {
    id: 8,
    name: 'Utilidades',
    color: '#F59E0B',
    budget: 600,
    spent: 580,
    type: 'expense',
  },
  {
    id: 9,
    name: 'Receita',
    color: '#22C55E',
    budget: 0,
    spent: 0,
    type: 'income',
  },
  {
    id: 10,
    name: 'Receita Extra',
    color: '#10B981',
    budget: 0,
    spent: 0,
    type: 'income',
  },
]

// Cores disponíveis para seleção
const availableColors = [
  { name: 'Vermelho', value: '#EF4444' },
  { name: 'Laranja', value: '#F97316' },
  { name: 'Amarelo', value: '#F59E0B' },
  { name: 'Verde', value: '#10B981' },
  { name: 'Verde Claro', value: '#22C55E' },
  { name: 'Azul', value: '#3B82F6' },
  { name: 'Azul Claro', value: '#06B6D4' },
  { name: 'Roxo', value: '#8B5CF6' },
  { name: 'Rosa', value: '#EC4899' },
]

export function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories)
  const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false)
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [newCategory, setNewCategory] = useState({
    name: '',
    color: '#3B82F6',
    budget: '',
    type: 'expense',
  })

  // Função para abrir o modal de edição de categoria
  const openEditCategory = (category: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedCategory(category)
    setNewCategory({
      name: category.name,
      color: category.color,
      budget: category.budget.toString(),
      type: category.type,
    })
    setIsEditCategoryOpen(true)
  }

  // Função para lidar com a criação de uma nova categoria
  const handleCreateCategory = () => {
    // Validação básica
    if (!newCategory.name || !newCategory.color) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    // Criar nova categoria
    const category = {
      id: categories.length + 1,
      name: newCategory.name,
      color: newCategory.color,
      budget:
        newCategory.type === 'expense'
          ? Number.parseFloat(newCategory.budget) || 0
          : 0,
      spent: 0,
      type: newCategory.type,
    }

    // Adicionar à lista de categorias
    setCategories([...categories, category])

    // Resetar o formulário e fechar o modal
    setNewCategory({
      name: '',
      color: '#3B82F6',
      budget: '',
      type: 'expense',
    })
    setIsNewCategoryOpen(false)
  }

  // Função para lidar com a atualização de uma categoria
  const handleUpdateCategory = () => {
    if (!selectedCategory) return

    // Validação básica
    if (!newCategory.name || !newCategory.color) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    // Atualizar categoria
    const updatedCategories = categories.map((cat) => {
      if (cat.id === selectedCategory.id) {
        return {
          ...cat,
          name: newCategory.name,
          color: newCategory.color,
          budget:
            newCategory.type === 'expense'
              ? Number.parseFloat(newCategory.budget) || 0
              : 0,
          type: newCategory.type,
        }
      }
      return cat
    })

    // Atualizar a lista de categorias
    setCategories(updatedCategories)

    // Resetar o formulário e fechar o modal
    setNewCategory({
      name: '',
      color: '#3B82F6',
      budget: '',
      type: 'expense',
    })
    setIsEditCategoryOpen(false)
  }

  // Função para lidar com a exclusão de uma categoria
  const handleDeleteCategory = (categoryId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      const updatedCategories = categories.filter(
        (cat) => cat.id !== categoryId,
      )
      setCategories(updatedCategories)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categorias</h1>
          <p className="text-muted-foreground">
            Gerencie as categorias de suas transações
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsNewCategoryOpen(true)}>
          <PlusIcon className="h-4 w-4" />
          Nova Categoria
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="h-1" style={{ backgroundColor: category.color }} />
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.name}
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => openEditCategory(category, e)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={(e) => handleDeleteCategory(category.id, e)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Excluir</span>
                  </Button>
                </div>
              </div>
              {category.type === 'expense' && (
                <CardDescription>
                  Orçamento: R$ {category.budget.toFixed(2)}
                </CardDescription>
              )}
              {category.type === 'income' && (
                <CardDescription>Tipo: Receita</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {category.type === 'expense' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Gasto: R$ {category.spent.toFixed(2)}</span>
                    <span className="font-medium">
                      {Math.round((category.spent / category.budget) * 100) ||
                        0}
                      %
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-primary/10 dark:bg-primary/20">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${Math.min(100, (category.spent / category.budget) * 100 || 0)}%`,
                        backgroundColor: category.color,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-end">
                    <span className="text-xs text-muted-foreground">
                      Restante: R${' '}
                      {(category.budget - category.spent).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
              {category.type === 'income' && (
                <div className="flex items-center justify-center h-[72px]">
                  <span className="text-sm text-muted-foreground">
                    Categoria de receita
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal para Nova Categoria */}
      <Dialog open={isNewCategoryOpen} onOpenChange={setIsNewCategoryOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nova Categoria</DialogTitle>
            <DialogDescription>
              Adicione uma nova categoria para organizar suas transações.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category-type" className="text-right">
                Tipo
              </Label>
              <div className="col-span-3">
                <Select
                  value={newCategory.type}
                  onValueChange={(value) =>
                    setNewCategory({ ...newCategory, type: value })
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
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                placeholder="Ex: Alimentação"
                className="col-span-3"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Cor
              </Label>
              <div className="col-span-3">
                <Select
                  value={newCategory.color}
                  onValueChange={(value) =>
                    setNewCategory({ ...newCategory, color: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma cor">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-4 w-4 rounded-full"
                          style={{ backgroundColor: newCategory.color }}
                        />
                        <span>
                          {availableColors.find(
                            (c) => c.value === newCategory.color,
                          )?.name || 'Selecione uma cor'}
                        </span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {availableColors.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <div
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: color.value }}
                          />
                          <span>{color.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {newCategory.type === 'expense' && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="budget" className="text-right">
                  Orçamento (R$)
                </Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="0,00"
                  className="col-span-3"
                  value={newCategory.budget}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, budget: e.target.value })
                  }
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewCategoryOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleCreateCategory}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Editar Categoria */}
      <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Categoria</DialogTitle>
            <DialogDescription>
              Atualize as informações da categoria selecionada.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-category-type" className="text-right">
                Tipo
              </Label>
              <div className="col-span-3">
                <Select
                  value={newCategory.type}
                  onValueChange={(value) =>
                    setNewCategory({ ...newCategory, type: value })
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
              <Label htmlFor="edit-name" className="text-right">
                Nome
              </Label>
              <Input
                id="edit-name"
                placeholder="Ex: Alimentação"
                className="col-span-3"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-color" className="text-right">
                Cor
              </Label>
              <div className="col-span-3">
                <Select
                  value={newCategory.color}
                  onValueChange={(value) =>
                    setNewCategory({ ...newCategory, color: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma cor">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-4 w-4 rounded-full"
                          style={{ backgroundColor: newCategory.color }}
                        />
                        <span>
                          {availableColors.find(
                            (c) => c.value === newCategory.color,
                          )?.name || 'Selecione uma cor'}
                        </span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {availableColors.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <div
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: color.value }}
                          />
                          <span>{color.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {newCategory.type === 'expense' && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-budget" className="text-right">
                  Orçamento (R$)
                </Label>
                <Input
                  id="edit-budget"
                  type="number"
                  placeholder="0,00"
                  className="col-span-3"
                  value={newCategory.budget}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, budget: e.target.value })
                  }
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditCategoryOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleUpdateCategory}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
