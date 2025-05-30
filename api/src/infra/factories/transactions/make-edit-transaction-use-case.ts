import { PrismaTransactionsRepository } from "../../repositories/prisma/prisma-transactions-repository";
import { PrismaBudgetsRepository } from "../../repositories/prisma/prisma-budgets-repository";
import { EditTransactionUseCase } from "@/domain/use-cases/transactions/edit-transaction-use-case";

export function makeEditTransactionUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository();
  const budgetsRepository = new PrismaBudgetsRepository();
  const useCase = new EditTransactionUseCase(
    transactionsRepository,
    budgetsRepository
  );

  return useCase;
}
