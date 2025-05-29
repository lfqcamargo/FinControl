import { BudgetsRepositoryInterface } from "@/domain/repositories/interfaces/budgets-repository-interface";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteBudgetUseCaseRequest {
  id: number;
  userId: string;
}

export class DeleteBudgetUseCase {
  constructor(private budgetsRepository: BudgetsRepositoryInterface) {}

  async execute({ id, userId }: DeleteBudgetUseCaseRequest): Promise<boolean> {
    const existingBudget = await this.budgetsRepository.findById(id);

    if (!existingBudget || existingBudget.userId !== userId) {
      throw new ResourceNotFoundError("Orçamento não encontrado");
    }

    return await this.budgetsRepository.delete(existingBudget);
  }
}
