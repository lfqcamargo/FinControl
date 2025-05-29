import { describe, it, expect } from "vitest";
import { CreateBudgetUseCase } from "./create-budget-use-case";
import { InMemoryBudgetsRepository } from "@/domain/repositories/in-memory/in-memory-budgets-repository";
import { ResourceAlreadyExistsError } from "@/domain/use-cases/errors/resource-already-exists-error";

describe("CreateBudget Use Case", () => {
  it("should create a budget for a user", async () => {
    const budgetsRepository = new InMemoryBudgetsRepository();
    const createBudgetUseCase = new CreateBudgetUseCase(budgetsRepository);

    const result = await createBudgetUseCase.execute({
      userId: "user-01",
      title: "Alimentação",
      value: 500,
      color: "#FF0000",
      date: new Date("2025-05-01"),
    });

    expect(result.budget.id).toEqual(expect.any(Number)); // ou String se seu ID for string
    expect(result.budget.title).toBe("Alimentação");
  });

  it("should not create a duplicate budget in the same month/year with same title", async () => {
    const budgetsRepository = new InMemoryBudgetsRepository();
    const createBudgetUseCase = new CreateBudgetUseCase(budgetsRepository);

    const payload = {
      userId: "user-01",
      title: "Transporte",
      value: 200,
      color: "#00FF00",
      date: new Date("2025-05-10"),
    };

    await createBudgetUseCase.execute(payload);

    await expect(() =>
      createBudgetUseCase.execute(payload)
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError);
  });

  it("should allow creating same title in a different month", async () => {
    const budgetsRepository = new InMemoryBudgetsRepository();
    const createBudgetUseCase = new CreateBudgetUseCase(budgetsRepository);

    await createBudgetUseCase.execute({
      userId: "user-01",
      title: "Lazer",
      value: 300,
      color: "#0000FF",
      date: new Date("2025-05-01"),
    });

    const result = await createBudgetUseCase.execute({
      userId: "user-01",
      title: "Lazer",
      value: 400,
      color: "#0000FF",
      date: new Date("2025-06-01"),
    });

    expect(result.budget.value).toBe(400);
    const budgetMonth = result.budget.date.getMonth();
    expect(budgetMonth).toBe(new Date("2025-06-01").getMonth());
  });
});
