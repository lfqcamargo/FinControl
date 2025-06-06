import { prisma } from "@/infra/lib/prisma";
import { Prisma, Budget } from "generated/prisma";
import { BudgetsRepositoryInterface } from "@/domain/repositories/interfaces/budgets-repository-interface";

export class PrismaBudgetsRepository implements BudgetsRepositoryInterface {
  async create(data: Prisma.BudgetUncheckedCreateInput) {
    const budget = await prisma.budget.create({
      data,
    });

    return budget;
  }

  async findById(id: number) {
    const budget = await prisma.budget.findUnique({
      where: { id },
    });

    return budget;
  }

  async fetchByUserId(userId: string, date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 1);

    const budgets = await prisma.budget.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      orderBy: {
        title: "asc",
      },
    });

    const totalValue = budgets.reduce((acc, budget) => acc + budget.value, 0);

    return { budgets, totalValue };
  }

  async save(data: Budget) {
    const updatedBudget = await prisma.budget.update({
      where: { id: data.id },
      data,
    });

    return updatedBudget;
  }

  async delete(data: Budget) {
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
