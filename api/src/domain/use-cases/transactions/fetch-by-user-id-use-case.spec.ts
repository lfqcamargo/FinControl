import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTransactionsRepository } from "../../repositories/in-memory/in-memory-transactions-repository";
import { FetchTransactionsByUserIdUseCase } from "./fetch-by-user-id-use-case";

let transactionsRepository: InMemoryTransactionsRepository;
let sut: FetchTransactionsByUserIdUseCase;

describe("Fetch Transactions By User Id Use Case", () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository();
    sut = new FetchTransactionsByUserIdUseCase(transactionsRepository);
  });

  it("should be able to fetch transactions by user id", async () => {
    await transactionsRepository.create({
      description: "Test Transaction 1",
      value: 100,
      observation: "Test observation",
      budgetId: 1,
      userId: "user-01",
    });

    await transactionsRepository.create({
      description: "Test Transaction 2",
      value: 200,
      observation: "Test observation",
      budgetId: 1,
      userId: "user-01",
    });

    await transactionsRepository.create({
      description: "Test Transaction 3",
      value: 300,
      observation: "Test observation",
      budgetId: 1,
      userId: "user-02",
    });

    const { transactions } = await sut.execute({
      userId: "user-01",
    });

    expect(transactions).toHaveLength(2);
    expect(transactions).toEqual([
      expect.objectContaining({ description: "Test Transaction 1" }),
      expect.objectContaining({ description: "Test Transaction 2" }),
    ]);
  });
});
