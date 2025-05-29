import { describe, it, expect } from "vitest";
import { DeleteBudgetUseCase } from "./delete-budget-use-case";
import { InMemoryBudgetsRepository } from "@/domain/repositories/in-memory/in-memory-budgets-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

describe("DeleteBudget Use Case", () => {
  it("should delete an existing budget", async () => {
    const budgetsRepository = new InMemoryBudgetsRepository();
    const deleteBudgetUseCase = new DeleteBudgetUseCase(budgetsRepository);

    const budget = await budgetsRepository.create({
      user: { connect: { id: "user-01" } },
      title: "Educação",
      value: 200,
      color: "#123456",
      date: new Date("2025-05-01"),
    });

    await deleteBudgetUseCase.execute({ id: budget.id, userId: "user-01" });

    const found = await budgetsRepository.findById(budget.id);
    expect(found).toBeNull();
  });

  it("should throw error if budget does not exist", async () => {
    const budgetsRepository = new InMemoryBudgetsRepository();
    const deleteBudgetUseCase = new DeleteBudgetUseCase(budgetsRepository);

    await expect(() =>
      deleteBudgetUseCase.execute({
        id: 999,
        userId: "user-01",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should throw error if budget does not belong to user", async () => {
    const budgetsRepository = new InMemoryBudgetsRepository();
    const deleteBudgetUseCase = new DeleteBudgetUseCase(budgetsRepository);

    const budget = await budgetsRepository.create({
      user: { connect: { id: "user-01" } },
      title: "Saúde",
      value: 350,
      color: "#abcdef",
      date: new Date("2025-07-01"),
    });

    await expect(() =>
      deleteBudgetUseCase.execute({
        id: budget.id,
        userId: "wrong-user",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
