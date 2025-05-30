import { Prisma, Transaction } from "generated/prisma";

export interface TransactionsRepositoryInterface {
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>;
  findByUserId(userId: string): Promise<{ transactions: Transaction[] }>;
  findById(id: number): Promise<Transaction | null>;
  delete(id: number): Promise<void>;
  save(data: Transaction): Promise<Transaction>;
}
