import { Transaction } from "generated/prisma";
import { TransactionsRepositoryInterface } from "../../repositories/interfaces/transactions-repository-interface";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { BudgetsRepositoryInterface } from "../../repositories/interfaces/budgets-repository-interface";

interface CreateTransactionUseCaseRequest {
  description: string;
  value: number;
  observation: string;
  budgetId: number;
  userId: string;
}

interface CreateTransactionUseCaseResponse {
  transaction: Transaction;
}

export class CreateTransactionUseCase {
  constructor(
    private transactionsRepository: TransactionsRepositoryInterface,
    private budgetsRepository: BudgetsRepositoryInterface
  ) {}

  async execute({
    description,
    value,
    observation,
    budgetId,
    userId,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const budget = await this.budgetsRepository.findById(budgetId);

    if (!budget) {
      throw new ResourceNotFoundError();
    }

    if (budget.userId !== userId) {
      throw new Error("Budget does not belong to user");
    }

    const transaction = await this.transactionsRepository.create({
      description,
      value,
      observation,
      budgetId,
      userId,
    });

    return {
      transaction,
    };
  }
}
