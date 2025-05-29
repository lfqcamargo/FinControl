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
    const existingBudgets = await this.budgetsRepository.fetchByUserId(userId);

    const isDuplicate = existingBudgets?.some(
      (budget) =>
        budget.title === title &&
        budget.date.getMonth() === date.getMonth() &&
        budget.date.getFullYear() === date.getFullYear()
    );

    if (isDuplicate) {
      throw new ResourceAlreadyExistsError("Orçamento já existe.");
    }

    const budget = await this.budgetsRepository.create({
      user: { connect: { id: userId } },
      title,
      value,
      color,
      date,
    });

    return { budget };
  }
}
