import { Transaction } from "generated/prisma";
import { TransactionsRepositoryInterface } from "../../repositories/interfaces/transactions-repository-interface";

interface FetchTransactionsByUserIdUseCaseRequest {
  userId: string;
}

interface FetchTransactionsByUserIdUseCaseResponse {
  transactions: Transaction[];
}

export class FetchTransactionsByUserIdUseCase {
  constructor(
    private transactionsRepository: TransactionsRepositoryInterface
  ) {}

  async execute({
    userId,
  }: FetchTransactionsByUserIdUseCaseRequest): Promise<FetchTransactionsByUserIdUseCaseResponse> {
    const transactions = await this.transactionsRepository.findByUserId(userId);

    return {
      transactions: transactions,
    };
  }
}
