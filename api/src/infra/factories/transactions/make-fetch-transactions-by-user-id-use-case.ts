import { PrismaTransactionsRepository } from "../../repositories/prisma/prisma-transactions-repository";
import { FetchTransactionsByUserIdUseCase } from "@/domain/use-cases/transactions/fetch-by-user-id-use-case";

export function makeFetchTransactionsByUserIdUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository();
  const useCase = new FetchTransactionsByUserIdUseCase(transactionsRepository);

  return useCase;
}
