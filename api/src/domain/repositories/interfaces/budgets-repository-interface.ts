import { Prisma, Budget } from "generated/prisma";

export interface BudgetsRepositoryInterface {
  create(data: Prisma.BudgetCreateInput): Promise<Budget>;
  findById(id: number): Promise<Budget | null>;
  fetchByUserId(userId: string): Promise<Budget[] | null>;
  save(data: Budget): Promise<Budget>;
  delete(data: Budget): Promise<boolean>;
}
