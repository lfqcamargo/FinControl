import { TransactionsRepositoryInterface } from "../../repositories/interfaces/transactions-repository-interface";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteTransactionUseCaseRequest {
  id: number;
  userId: string;
}

export class DeleteTransactionUseCase {
  constructor(
    private transactionsRepository: TransactionsRepositoryInterface
  ) {}

  async execute({
    id,
    userId,
  }: DeleteTransactionUseCaseRequest): Promise<void> {
    const existingTransaction = await this.transactionsRepository.findById(id);

    if (!existingTransaction || existingTransaction.userId !== userId) {
      throw new ResourceNotFoundError("Transação não encontrada");
    }

    await this.transactionsRepository.delete(id);
  }
}
