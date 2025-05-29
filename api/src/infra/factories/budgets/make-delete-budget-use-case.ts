import { PrismaBudgetsRepository } from "@/infra/repositories/prisma/prisma-budgets-repository";
import { DeleteBudgetUseCase } from "@/domain/use-cases/budgets/delete-budget-use-case";

export function makeDeleteBudgetUseCase() {
  const budgetsRepository = new PrismaBudgetsRepository();
  const deleteBudgetUseCase = new DeleteBudgetUseCase(budgetsRepository);

  return deleteBudgetUseCase;
}
