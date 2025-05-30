import { PrismaTransactionsRepository } from "../../repositories/prisma/prisma-transactions-repository";
import { FindTransactionByIdUseCase } from "@/domain/use-cases/transactions/find-by-id-transaction-use-case";

export function makeFindTransactionByIdUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository();
  const useCase = new FindTransactionByIdUseCase(transactionsRepository);

  return useCase;
}
