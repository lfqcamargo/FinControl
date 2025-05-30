import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTransactionsRepository } from "../../repositories/in-memory/in-memory-transactions-repository";
import { InMemoryBudgetsRepository } from "../../repositories/in-memory/in-memory-budgets-repository";
import { EditTransactionUseCase } from "./edit-transaction-use-case";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let transactionsRepository: InMemoryTransactionsRepository;
let budgetsRepository: InMemoryBudgetsRepository;
let sut: EditTransactionUseCase;

describe("Edit Transaction Use Case", () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository();
    budgetsRepository = new InMemoryBudgetsRepository();
    sut = new EditTransactionUseCase(transactionsRepository, budgetsRepository);
  });

  it("should be able to edit a transaction", async () => {
    const budget = await budgetsRepository.create({
      title: "Test Budget",
      value: 1000,
      color: "#000000",
      date: new Date(),
      userId: "user-01",
    });

    const createdTransaction = await transactionsRepository.create({
      description: "Test Transaction",
      value: 100,
      observation: "Test observation",
      budgetId: budget.id,
      userId: "user-01",
    });

    const { transaction } = await sut.execute({
      id: createdTransaction.id,
      description: "Updated Transaction",
      value: 200,
      observation: "Updated observation",
      budgetId: budget.id,
      userId: "user-01",
    });

    expect(transaction.description).toEqual("Updated Transaction");
    expect(transaction.value).toEqual(200);
    expect(transaction.observation).toEqual("Updated observation");
  });

  it("should not be able to edit a non-existing transaction", async () => {
    const budget = await budgetsRepository.create({
      title: "Test Budget",
      value: 1000,
      color: "#000000",
      date: new Date(),
      userId: "user-01",
    });

    await expect(() =>
      sut.execute({
        id: 1,
        description: "Updated Transaction",
        value: 200,
        observation: "Updated observation",
        budgetId: budget.id,
        userId: "user-01",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to edit a transaction from another user", async () => {
    const budget = await budgetsRepository.create({
      title: "Test Budget",
      value: 1000,
      color: "#000000",
      date: new Date(),
      userId: "user-01",
    });

    const createdTransaction = await transactionsRepository.create({
      description: "Test Transaction",
      value: 100,
      observation: "Test observation",
      budgetId: budget.id,
      userId: "user-01",
    });

    await expect(() =>
      sut.execute({
        id: createdTransaction.id,
        description: "Updated Transaction",
        value: 200,
        observation: "Updated observation",
        budgetId: budget.id,
        userId: "user-02",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to edit a transaction with non-existing budget", async () => {
    const budget = await budgetsRepository.create({
      title: "Test Budget",
      value: 1000,
      color: "#000000",
      date: new Date(),
      userId: "user-01",
    });

    const createdTransaction = await transactionsRepository.create({
      description: "Test Transaction",
      value: 100,
      observation: "Test observation",
      budgetId: budget.id,
      userId: "user-01",
    });

    await expect(() =>
      sut.execute({
        id: createdTransaction.id,
        description: "Updated Transaction",
        value: 200,
        observation: "Updated observation",
        budgetId: 999,
        userId: "user-01",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to edit a transaction with budget from another user", async () => {
    const budget1 = await budgetsRepository.create({
      title: "Test Budget 1",
      value: 1000,
      color: "#000000",
      date: new Date(),
      userId: "user-01",
    });

    const budget2 = await budgetsRepository.create({
      title: "Test Budget 2",
      value: 1000,
      color: "#000000",
      date: new Date(),
      userId: "user-02",
    });

    const createdTransaction = await transactionsRepository.create({
      description: "Test Transaction",
      value: 100,
      observation: "Test observation",
      budgetId: budget1.id,
      userId: "user-01",
    });

    await expect(() =>
      sut.execute({
        id: createdTransaction.id,
        description: "Updated Transaction",
        value: 200,
        observation: "Updated observation",
        budgetId: budget2.id,
        userId: "user-01",
      })
    ).rejects.toThrow("Orçamento não pertence ao usuário");
  });
});
