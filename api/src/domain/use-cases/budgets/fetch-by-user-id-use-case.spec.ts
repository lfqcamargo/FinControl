import { describe, it, expect } from "vitest";
import { FetchBudgetsByUserIdUseCase } from "./fetch-by-user-id-use-case";
import { InMemoryBudgetsRepository } from "@/domain/repositories/in-memory/in-memory-budgets-repository";

describe("FetchBudgetsByUserId Use Case", () => {
  it("should return budgets for a given user in specific month/year", async () => {
    const budgetsRepository = new InMemoryBudgetsRepository();
    const fetchBudgetsByUserIdUseCase = new FetchBudgetsByUserIdUseCase(
      budgetsRepository
    );

    await budgetsRepository.create({
      user: { connect: { id: "user-01" } },
      title: "Moradia",
      value: 1000,
      color: "#333333",
      date: new Date("2025-05-01"),
    });

    await budgetsRepository.create({
      user: { connect: { id: "user-01" } },
      title: "Lazer",
      value: 400,
      color: "#0000FF",
      date: new Date("2025-06-01"),
    });

    await budgetsRepository.create({
      user: { connect: { id: "user-02" } },
      title: "Transporte",
      value: 300,
      color: "#123123",
      date: new Date("2025-06-01"),
    });

    const { budgets, totalValue } = await fetchBudgetsByUserIdUseCase.execute({
      userId: "user-01",
      date: new Date("2025-06-01"),
    });

    expect(budgets.length).toBe(1);
    expect(budgets[0].title).toBe("Lazer");
    expect(totalValue).toBe(400); // soma do valor dos budgets retornados
  });

  it("should return empty array and zero totalValue if no budgets in the selected month/year", async () => {
    const budgetsRepository = new InMemoryBudgetsRepository();
    const fetchBudgetsByUserIdUseCase = new FetchBudgetsByUserIdUseCase(
      budgetsRepository
    );

    await budgetsRepository.create({
      user: { connect: { id: "user-01" } },
      title: "Moradia",
      value: 1000,
      color: "#333333",
      date: new Date("2025-05-01"),
    });

    const { budgets, totalValue } = await fetchBudgetsByUserIdUseCase.execute({
      userId: "user-01",
      date: new Date("2025-06-01"),
    });

    expect(budgets).toEqual([]);
    expect(totalValue).toBe(0);
  });
});
