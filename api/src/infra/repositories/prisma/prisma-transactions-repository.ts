import { Prisma } from "generated/prisma";
import { prisma } from "@/infra/lib/prisma";
import { TransactionsRepositoryInterface } from "@/domain/repositories/interfaces/transactions-repository-interface";

export class PrismaTransactionsRepository
  implements TransactionsRepositoryInterface
{
  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = await prisma.transaction.create({
      data,
    });

    return transaction;
  }

  async findByUserId(userId: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        budgetId: "asc",
      },
    });

    return { transactions };
  }

  async findById(id: number) {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    return transaction;
  }

  async delete(id: number) {
    await prisma.transaction.delete({
      where: {
        id,
      },
    });
  }

  async save(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = await prisma.transaction.update({
      where: {
        id: data.id,
      },
      data,
    });

    return transaction;
  }
}
