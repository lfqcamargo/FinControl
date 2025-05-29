import { prisma } from "@/infra/lib/prisma";
import { Prisma, Budget } from "generated/prisma";
import { BudgetsRepositoryInterface } from "@/domain/repositories/interfaces/budgets-repository-interface";

export class PrismaBudgetsRepository implements BudgetsRepositoryInterface {
  async create(data: Prisma.BudgetCreateInput): Promise<Budget> {
    const budget = await prisma.budget.create({
      data,
    });

    return budget;
  }

  async findById(id: number): Promise<Budget | null> {
    const budget = await prisma.budget.findUnique({
      where: { id },
    });

    return budget;
  }

  async fetchByUserId(userId: string): Promise<Budget[] | null> {
    const budgets = await prisma.budget.findMany({
      where: { userId },
      orderBy: {
        date: "desc",
      },
    });

    return budgets.length > 0 ? budgets : null;
  }

  async save(data: Budget): Promise<Budget> {
    const updatedBudget = await prisma.budget.update({
      where: { id: data.id },
      data,
    });

    return updatedBudget;
  }

  async delete(data: Budget): Promise<boolean> {
    try {
      await prisma.budget.delete({
        where: { id: data.id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
