import { PrismaBudgetsRepository } from "@/infra/repositories/prisma/prisma-budgets-repository";
import { CreateBudgetUseCase } from "@/domain/use-cases/budgets/create-budget-use-case";

export function makeCreateBudgetUseCase() {
  const budgetsRepository = new PrismaBudgetsRepository();
  const createBudgetUseCase = new CreateBudgetUseCase(budgetsRepository);

  return createBudgetUseCase;
}
