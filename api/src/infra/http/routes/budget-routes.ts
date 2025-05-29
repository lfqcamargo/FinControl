import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/infra/http/middlewares/verify-jwt";

import { createBudgetController } from "../controllers/budgets/create-budget-controller";
import { fetchBudgetsByUserIdController } from "../controllers/budgets/fetch-by-user-id-controller";
import { findBudgetByIdController } from "../controllers/budgets/find-by-id-controller";
import { saveBudgetController } from "../controllers/budgets/save-budget-controller";
import { deleteBudgetController } from "../controllers/budgets/delete-budget-controller";

export async function budgetRoutes(app: FastifyInstance) {
  app.post("/budgets", { onRequest: [verifyJwt] }, createBudgetController);

  app.get(
    "/budgets",
    { onRequest: [verifyJwt] },
    fetchBudgetsByUserIdController
  );

  app.get("/budgets/:id", { onRequest: [verifyJwt] }, findBudgetByIdController);

  app.put("/budgets/:id", { onRequest: [verifyJwt] }, saveBudgetController);

  app.delete(
    "/budgets/:id",
    { onRequest: [verifyJwt] },
    deleteBudgetController
  );
}
