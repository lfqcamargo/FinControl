import { BudgetsRepositoryInterface } from "@/domain/repositories/interfaces/budgets-repository-interface";
import { Budget } from "generated/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface FindBudgetByIdUseCaseRequest {
  id: number;
  userId: string;
}

interface FindBudgetByIdUseCaseResponse {
  budget: Budget;
}

export class FindBudgetByIdUseCase {
  constructor(private budgetsRepository: BudgetsRepositoryInterface) {}

  async execute({
    id,
    userId,
  }: FindBudgetByIdUseCaseRequest): Promise<FindBudgetByIdUseCaseResponse> {
    const budget = await this.budgetsRepository.findById(id);

    if (!budget || budget.userId !== userId) {
      throw new ResourceNotFoundError("Orçamento não encontrado");
    }

    return { budget };
  }
}
