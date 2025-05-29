import { PrismaBudgetsRepository } from "@/infra/repositories/prisma/prisma-budgets-repository";
import { FindBudgetByIdUseCase } from "@/domain/use-cases/budgets/find-by-id-use-case";

export function makeFindBudgetByIdUseCase() {
  const budgetsRepository = new PrismaBudgetsRepository();
  const findBudgetUseCase = new FindBudgetByIdUseCase(budgetsRepository);

  return findBudgetUseCase;
}
