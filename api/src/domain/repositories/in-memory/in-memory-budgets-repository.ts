import { Prisma, Budget } from "generated/prisma";
import { BudgetsRepositoryInterface } from "@/domain/repositories/interfaces/budgets-repository-interface";

export class InMemoryBudgetsRepository implements BudgetsRepositoryInterface {
  public items: Budget[] = [];

  async create(data: Prisma.BudgetCreateInput): Promise<Budget> {
    const budget: Budget = {
      id: this.items.length + 1,
      title: data.title,
      value: data.value,
      color: data.color,
      date: data.date as Date,
      userId: data.user.connect?.id ?? "",
    };

    this.items.push(budget);
    return budget;
  }

  async findById(id: number): Promise<Budget | null> {
    return this.items.find((item) => item.id === Number(id)) || null;
  }

  async fetchByUserId(userId: string): Promise<Budget[] | null> {
    const results = this.items.filter((item) => item.userId === userId);
    return results.length > 0 ? results : null;
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
