import { expect, describe, it } from "vitest";
import { SaveBudgetUseCase } from "./save-budget-use-case";
import { InMemoryBudgetsRepository } from "@/domain/repositories/in-memory/in-memory-budgets-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

describe("SaveBudget Use Case", () => {
  it("should update a budget successfully", async () => {
    const budgetsRepository = new InMemoryBudgetsRepository();
    const saveBudgetUseCase = new SaveBudgetUseCase(budgetsRepository);

    const created = await budgetsRepository.create({
      userId: "user-01",
      title: "Transporte",
      value: 100,
      color: "#FF0000",
      date: new Date("2025-05-01"),
    });

    const result = await saveBudgetUseCase.execute({
      id: created.id,
      userId: "user-01",
      title: "Transporte atualizado",
      value: 150,
      color: "#00FF00",
      date: new Date("2025-06-01"),
    });

    expect(result.budget.title).toBe("Transporte atualizado");
    expect(result.budget.value).toBe(150);
    expect(result.budget.color).toBe("#00FF00");
    const budgetMonth = result.budget.date.getMonth();
    expect(budgetMonth).toBe(new Date("2025-06-01").getMonth());
  });

  it("should throw error if budget does not exist", async () => {
    const budgetsRepository = new InMemoryBudgetsRepository();
    const saveBudgetUseCase = new SaveBudgetUseCase(budgetsRepository);

    await expect(() =>
      saveBudgetUseCase.execute({
        id: 999,
        userId: "user-01",
        title: "Inexistente",
        value: 200,
        color: "#000",
        date: new Date(),
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should throw error if userId does not match", async () => {
    const budgetsRepository = new InMemoryBudgetsRepository();
    const saveBudgetUseCase = new SaveBudgetUseCase(budgetsRepository);

    const created = await budgetsRepository.create({
      userId: "user-01",
      title: "Viagem",
      value: 500,
      color: "#333",
      date: new Date("2025-07-01"),
    });

    await expect(() =>
      saveBudgetUseCase.execute({
        id: created.id,
        userId: "wrong-user",
        title: "Hack",
        value: 999,
        color: "#FFF",
        date: new Date(),
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
