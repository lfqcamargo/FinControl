import { PrismaBudgetsRepository } from "@/infra/repositories/prisma/prisma-budgets-repository";
import { SaveBudgetUseCase } from "@/domain/use-cases/budgets/save-budget-use-case";

export function makeSaveBudgetUseCase() {
  const budgetsRepository = new PrismaBudgetsRepository();
  const saveBudgetUseCase = new SaveBudgetUseCase(budgetsRepository);

  return saveBudgetUseCase;
}
