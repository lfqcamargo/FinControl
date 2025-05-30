import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTransactionsRepository } from "../../repositories/in-memory/in-memory-transactions-repository";
import { FindTransactionByIdUseCase } from "./find-by-id-transaction-use-case";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let transactionsRepository: InMemoryTransactionsRepository;
let sut: FindTransactionByIdUseCase;

describe("Find Transaction By Id Use Case", () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository();
    sut = new FindTransactionByIdUseCase(transactionsRepository);
  });

  it("should be able to find a transaction by id", async () => {
    const createdTransaction = await transactionsRepository.create({
      description: "Test Transaction",
      value: 100,
      observation: "Test observation",
      budgetId: 1,
      userId: "user-01",
    });

    const { transaction } = await sut.execute({
      id: createdTransaction.id,
      userId: "user-01",
    });

    expect(transaction.id).toEqual(createdTransaction.id);
    expect(transaction.description).toEqual("Test Transaction");
  });

  it("should not be able to find a non-existing transaction", async () => {
    await expect(() =>
      sut.execute({
        id: 1,
        userId: "user-01",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to find a transaction from another user", async () => {
    const createdTransaction = await transactionsRepository.create({
      description: "Test Transaction",
      value: 100,
      observation: "Test observation",
      budgetId: 1,
      userId: "user-01",
    });

    await expect(() =>
      sut.execute({
        id: createdTransaction.id,
        userId: "user-02",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
