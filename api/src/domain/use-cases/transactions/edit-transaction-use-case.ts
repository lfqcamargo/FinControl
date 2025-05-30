import { Transaction } from "generated/prisma";
import { TransactionsRepositoryInterface } from "../../repositories/interfaces/transactions-repository-interface";
import { BudgetsRepositoryInterface } from "../../repositories/interfaces/budgets-repository-interface";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface EditTransactionUseCaseRequest {
  id: number;
  userId: string;
  description: string;
  value: number;
  observation: string;
  budgetId: number;
}

interface EditTransactionUseCaseResponse {
  transaction: Transaction;
}

export class EditTransactionUseCase {
  constructor(
    private transactionsRepository: TransactionsRepositoryInterface,
    private budgetsRepository: BudgetsRepositoryInterface
  ) {}

  async execute({
    id,
    userId,
    description,
    value,
    observation,
    budgetId,
  }: EditTransactionUseCaseRequest): Promise<EditTransactionUseCaseResponse> {
    const existingTransaction = await this.transactionsRepository.findById(id);

    if (!existingTransaction || existingTransaction.userId !== userId) {
      throw new ResourceNotFoundError("Transação não encontrada");
    }

    const budget = await this.budgetsRepository.findById(budgetId);

    if (!budget) {
      throw new ResourceNotFoundError("Orçamento não encontrado");
    }

    if (budget.userId !== userId) {
      throw new Error("Orçamento não pertence ao usuário");
    }

    const transaction = await this.transactionsRepository.save({
      id,
      description,
      value,
      observation,
      budgetId,
      userId,
    });

    return { transaction };
  }
}
