import { PrismaTransactionsRepository } from "../../repositories/prisma/prisma-transactions-repository";
import { PrismaBudgetsRepository } from "@/infra/repositories/prisma/prisma-budgets-repository";
import { CreateTransactionUseCase } from "../../../domain/use-cases/transactions/create-transaction-use-case";

export function makeCreateTransactionUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository();
  const budgetsRepository = new PrismaBudgetsRepository();
  const useCase = new CreateTransactionUseCase(
    transactionsRepository,
    budgetsRepository
  );

  return useCase;
}
