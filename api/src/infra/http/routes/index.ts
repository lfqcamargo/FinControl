import { FastifyInstance } from "fastify";
import { preferenceRoutes } from "./preference-routes";
import { budgetRoutes } from "./budget-routes";
import { userRoutes } from "./user-routes";

export async function appRoutes(app: FastifyInstance) {
  await userRoutes(app);
  await preferenceRoutes(app);
  await budgetRoutes(app);
}
