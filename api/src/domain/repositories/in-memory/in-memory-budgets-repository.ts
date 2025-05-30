import { Prisma, Budget } from "generated/prisma";
import { BudgetsRepositoryInterface } from "@/domain/repositories/interfaces/budgets-repository-interface";

export class InMemoryBudgetsRepository implements BudgetsRepositoryInterface {
  public items: Budget[] = [];

  async create(data: Prisma.BudgetUncheckedCreateInput): Promise<Budget> {
    const budget = {
      id: this.items.length + 1,
      title: data.title,
      value: data.value,
      color: data.color,
      date: data.date as Date,
      userId: data.userId,
    };

    this.items.push(budget);
    return budget;
  }

  async findById(id: number): Promise<Budget | null> {
    return this.items.find((item) => item.id === Number(id)) || null;
  }

  async fetchByUserId(userId: string, date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const results = this.items.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        item.userId === userId &&
        itemDate.getFullYear() === year &&
        itemDate.getMonth() === month
      );
    });

    const totalValue = results.reduce((acc, budget) => acc + budget.value, 0);

    return {
      budgets: results,
      totalValue,
    };
  }

  async save(data: Budget): Promise<Budget> {
    const index = this.items.findIndex((item) => item.id === data.id);
    if (index >= 0) this.items[index] = data;
    return data;
  }

  async delete(data: Budget): Promise<boolean> {
    const index = this.items.findIndex((item) => item.id === data.id);
    if (index >= 0) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
}
