import { Prisma, Budget } from "generated/prisma";

export interface BudgetsRepositoryInterface {
  create(data: Prisma.BudgetUncheckedCreateInput): Promise<Budget>;
  findById(id: number): Promise<Budget | null>;
  fetchByUserId(
    userId: string,
    date: Date
  ): Promise<{ budgets: Budget[]; totalValue: number }>;
  save(data: Budget): Promise<Budget>;
  delete(data: Budget): Promise<boolean>;
}
