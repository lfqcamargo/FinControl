import { PrismaBudgetsRepository } from "@/infra/repositories/prisma/prisma-budgets-repository";
import { FetchBudgetsByUserIdUseCase } from "@/domain/use-cases/budgets/fetch-by-user-id-use-case";

export function makeFetchBudgetsByUserIdUseCase() {
  const budgetsRepository = new PrismaBudgetsRepository();
  const fetchBudgetsUseCase = new FetchBudgetsByUserIdUseCase(
    budgetsRepository
  );

  return fetchBudgetsUseCase;
}
