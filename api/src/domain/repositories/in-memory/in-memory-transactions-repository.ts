import { Transaction, Prisma } from "generated/prisma";
import { TransactionsRepositoryInterface } from "../interfaces/transactions-repository-interface";

export class InMemoryTransactionsRepository
  implements TransactionsRepositoryInterface
{
  public items: Transaction[] = [];

  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = {
      id: this.items.length + 1,
      description: data.description,
      value: data.value,
      observation: data.observation,
      budgetId: data.budgetId,
      userId: data.userId,
    };

    this.items.push(transaction);

    return transaction;
  }

  async findByUserId(userId: string) {
    const transactions = this.items.filter(
      (transaction) => transaction.userId === userId
    );

    return transactions;
  }

  async findById(id: number) {
    const transaction = this.items.find((transaction) => transaction.id === id);

    if (!transaction) {
      return null;
    }

    return transaction;
  }

  async delete(id: number) {
    const transactionIndex = this.items.findIndex(
      (transaction) => transaction.id === id
    );

    if (transactionIndex >= 0) {
      this.items.splice(transactionIndex, 1);
    }
  }

  async save(data: Transaction) {
    const transactionIndex = this.items.findIndex(
      (transaction) => transaction.id === data.id
    );

    if (transactionIndex >= 0) {
      this.items[transactionIndex] = data;
    }

    return data;
  }
}
