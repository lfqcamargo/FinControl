import { BudgetsRepositoryInterface } from "@/domain/repositories/interfaces/budgets-repository-interface";
import { Budget } from "generated/prisma";

type BudgetWithoutUserId = Omit<Budget, "userId">;

interface FetchBudgetsByUserIdUseCaseRequest {
  userId: string;
  date: Date;
}

interface FetchBudgetsByUserIdUseCaseResponse {
  budgets: BudgetWithoutUserId[];
  totalValue: number;
}

export class FetchBudgetsByUserIdUseCase {
  constructor(private budgetsRepository: BudgetsRepositoryInterface) {}

  async execute({
    userId,
    date,
  }: FetchBudgetsByUserIdUseCaseRequest): Promise<FetchBudgetsByUserIdUseCaseResponse> {
    const result = await this.budgetsRepository.fetchByUserId(userId, date);

    const budgets = result?.budgets || [];
    const totalValue = result?.totalValue || 0;

    const budgetsWithoutUserId = budgets.map(({ userId, ...rest }) => rest);

    return {
      budgets: budgetsWithoutUserId,
      totalValue,
    };
  }
}
