import { BudgetsRepositoryInterface } from "@/domain/repositories/interfaces/budgets-repository-interface";
import { Budget } from "generated/prisma";

interface FetchBudgetsByUserIdUseCaseRequest {
  userId: string;
}

interface FetchBudgetsByUserIdUseCaseResponse {
  budgets: Budget[];
}

export class FetchBudgetsByUserIdUseCase {
  constructor(private budgetsRepository: BudgetsRepositoryInterface) {}

  async execute({
    userId,
  }: FetchBudgetsByUserIdUseCaseRequest): Promise<FetchBudgetsByUserIdUseCaseResponse> {
    const budgets = await this.budgetsRepository.fetchByUserId(userId);

    return { budgets: budgets || [] };
  }
}
