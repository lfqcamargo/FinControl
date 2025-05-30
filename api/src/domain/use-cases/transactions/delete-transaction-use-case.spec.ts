import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTransactionsRepository } from "../../repositories/in-memory/in-memory-transactions-repository";
import { DeleteTransactionUseCase } from "./delete-transaction-use-case";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let transactionsRepository: InMemoryTransactionsRepository;
let sut: DeleteTransactionUseCase;

describe("Delete Transaction Use Case", () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository();
    sut = new DeleteTransactionUseCase(transactionsRepository);
  });

  it("should be able to delete a transaction", async () => {
    const createdTransaction = await transactionsRepository.create({
      description: "Test Transaction",
      value: 100,
      observation: "Test observation",
      budgetId: 1,
      userId: "user-01",
    });

    await sut.execute({
      id: createdTransaction.id,
      userId: "user-01",
    });

    const deletedTransaction = await transactionsRepository.findById(
      createdTransaction.id
    );
    expect(deletedTransaction).toBeNull();
  });

  it("should not be able to delete a non-existing transaction", async () => {
    await expect(() =>
      sut.execute({
        id: 1,
        userId: "user-01",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to delete a transaction from another user", async () => {
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
