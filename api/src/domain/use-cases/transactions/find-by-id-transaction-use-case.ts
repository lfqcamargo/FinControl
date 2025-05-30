import { Transaction } from "generated/prisma";
import { TransactionsRepositoryInterface } from "../../repositories/interfaces/transactions-repository-interface";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface FindTransactionByIdUseCaseRequest {
  id: number;
  userId: string;
}

interface FindTransactionByIdUseCaseResponse {
  transaction: Transaction;
}

export class FindTransactionByIdUseCase {
  constructor(
    private transactionsRepository: TransactionsRepositoryInterface
  ) {}

  async execute({
    id,
    userId,
  }: FindTransactionByIdUseCaseRequest): Promise<FindTransactionByIdUseCaseResponse> {
    const transaction = await this.transactionsRepository.findById(id);

    if (!transaction || transaction.userId !== userId) {
      throw new ResourceNotFoundError("Transação não encontrada");
    }

    return { transaction };
  }
}
