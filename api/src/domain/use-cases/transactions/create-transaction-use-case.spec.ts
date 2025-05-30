import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTransactionsRepository } from "../../repositories/in-memory/in-memory-transactions-repository";
import { CreateTransactionUseCase } from "./create-transaction-use-case";
import { InMemoryBudgetsRepository } from "../../repositories/in-memory/in-memory-budgets-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let transactionsRepository: InMemoryTransactionsRepository;
let budgetsRepository: InMemoryBudgetsRepository;
let sut: CreateTransactionUseCase;

describe("Create Transaction Use Case", () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository();
    budgetsRepository = new InMemoryBudgetsRepository();
    sut = new CreateTransactionUseCase(
      transactionsRepository,
      budgetsRepository
    );
  });

  it("should be able to create a transaction", async () => {
    const budget = await budgetsRepository.create({
      title: "Test Budget",
      value: 1000,
      color: "#000000",
      date: new Date(),
      userId: "user-01",
    });

    const { transaction } = await sut.execute({
      description: "Test Transaction",
      value: 100,
      observation: "Test observation",
      budgetId: budget.id,
      userId: "user-01",
    });

    expect(transaction.id).toEqual(expect.any(Number));
    expect(transaction.description).toEqual("Test Transaction");
  });

  it("should not be able to create a transaction with non-existing budget", async () => {
    await expect(() =>
      sut.execute({
        description: "Test Transaction",
        value: 100,
        observation: "Test observation",
        budgetId: 1,
        userId: "user-01",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to create a transaction with budget from another user", async () => {
    const budget = await budgetsRepository.create({
      title: "Test Budget",
      value: 1000,
      color: "#000000",
      date: new Date(),
      userId: "user-01",
    });

    await expect(() =>
      sut.execute({
        description: "Test Transaction",
        value: 100,
        observation: "Test observation",
        budgetId: budget.id,
        userId: "user-02",
      })
    ).rejects.toThrow("Budget does not belong to user");
  });
});
