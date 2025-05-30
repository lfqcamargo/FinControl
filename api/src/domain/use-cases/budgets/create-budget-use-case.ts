import { Budget } from "generated/prisma";
import { BudgetsRepositoryInterface } from "@/domain/repositories/interfaces/budgets-repository-interface";
import { ResourceAlreadyExistsError } from "../errors/resource-already-exists-error";

interface CreateBudgetUseCaseRequest {
  userId: string;
  title: string;
  value: number;
  color: string;
  date: Date;
}

interface CreateBudgetUseCaseResponse {
  budget: Budget;
}

export class CreateBudgetUseCase {
  constructor(private budgetsRepository: BudgetsRepositoryInterface) {}

  async execute({
    userId,
    title,
    value,
    color,
    date,
  }: CreateBudgetUseCaseRequest): Promise<CreateBudgetUseCaseResponse> {
    const { budgets, totalValue } = await this.budgetsRepository.fetchByUserId(
      userId,
      date
    );

    const isDuplicate = budgets?.some(
      (budget) =>
        budget.title === title &&
        budget.date.getMonth() === date.getMonth() &&
        budget.date.getFullYear() === date.getFullYear()
    );

    if (isDuplicate) {
      throw new ResourceAlreadyExistsError("Orçamento já existe.");
    }

    const budget = await this.budgetsRepository.create({
      userId,
      title,
      value,
      color,
      date,
    });

    return { budget };
  }
}
