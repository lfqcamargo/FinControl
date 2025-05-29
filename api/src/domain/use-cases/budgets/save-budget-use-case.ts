import { BudgetsRepositoryInterface } from "@/domain/repositories/interfaces/budgets-repository-interface";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { Budget } from "generated/prisma";

interface SaveBudgetUseCaseRequest {
  id: number;
  userId: string;
  title: string;
  value: number;
  color: string;
  date: Date;
}

interface SaveBudgetUseCaseResponse {
  budget: Budget;
}

export class SaveBudgetUseCase {
  constructor(private budgetsRepository: BudgetsRepositoryInterface) {}

  async execute({
    id,
    userId,
    title,
    value,
    color,
    date,
  }: SaveBudgetUseCaseRequest): Promise<SaveBudgetUseCaseResponse> {
    const existingBudget = await this.budgetsRepository.findById(id);

    if (!existingBudget || existingBudget.userId !== userId) {
      throw new ResourceNotFoundError("Orçamento não encontrado");
    }

    existingBudget.title = title;
    existingBudget.value = value;
    existingBudget.color = color;
    existingBudget.date = date;

    const updatedBudget = await this.budgetsRepository.save(existingBudget);

    return {
      budget: updatedBudget,
    };
  }
}
