import { describe, it, expect } from "vitest";
import { FindBudgetByIdUseCase } from "./find-by-id-use-case";
import { InMemoryBudgetsRepository } from "@/domain/repositories/in-memory/in-memory-budgets-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

describe("FindBudgetById Use Case", () => {
  it("should return a budget by id", async () => {
    const budgetsRepository = new InMemoryBudgetsRepository();
    const findBudgetByIdUseCase = new FindBudgetByIdUseCase(budgetsRepository);

    const created = await budgetsRepository.create({
      user: { connect: { id: "user-01" } },
      title: "Moradia",
      value: 1000,
      color: "#333333",
      date: new Date("2025-05-01"),
    });

    const { budget } = await findBudgetByIdUseCase.execute({
      id: created.id,
      userId: "user-01",
    });

    expect(budget).toEqual(
      expect.objectContaining({
        id: created.id,
        title: "Moradia",
        value: 1000,
        userId: "user-01",
      })
    );
  });

  it("should throw if budget does not exist", async () => {
    const budgetsRepository = new InMemoryBudgetsRepository();
    const findBudgetByIdUseCase = new FindBudgetByIdUseCase(budgetsRepository);

    await expect(() =>
      findBudgetByIdUseCase.execute({
        id: 999,
        userId: "user-01",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should throw if budget belongs to another user", async () => {
    const budgetsRepository = new InMemoryBudgetsRepository();
    const findBudgetByIdUseCase = new FindBudgetByIdUseCase(budgetsRepository);

    const budget = await budgetsRepository.create({
      user: { connect: { id: "user-01" } },
      title: "Transporte",
      value: 250,
      color: "#123123",
      date: new Date("2025-06-01"),
    });

    await expect(() =>
      findBudgetByIdUseCase.execute({
        id: budget.id,
        userId: "user-02",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
