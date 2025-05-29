import { describe, it, expect } from "vitest";
import { FetchBudgetsByUserIdUseCase } from "./fetch-by-user-id-use-case";
import { InMemoryBudgetsRepository } from "@/domain/repositories/in-memory/in-memory-budgets-repository";

describe("FetchBudgetsByUserId Use Case", () => {
  it("should return all budgets for a given user", async () => {
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

    const { budgets } = await fetchBudgetsByUserIdUseCase.execute({
      userId: "user-01",
    });

    expect(budgets).toHaveLength(2);
    expect(budgets.map((b) => b.userId)).toEqual(["user-01", "user-01"]);
  });

  it("should return empty array if user has no budgets", async () => {
    const budgetsRepository = new InMemoryBudgetsRepository();
    const fetchBudgetsByUserIdUseCase = new FetchBudgetsByUserIdUseCase(
      budgetsRepository
    );

    const { budgets } = await fetchBudgetsByUserIdUseCase.execute({
      userId: "user-unknown",
    });

    expect(budgets).toEqual([]);
  });
});
