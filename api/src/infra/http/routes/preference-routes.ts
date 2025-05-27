import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/infra/http/middlewares/verify-jwt";
import { getPreferenceController } from "../controllers/preferences/get-preference-controller";
import { editPreferenceController } from "../controllers/preferences/edit-preference-controller";

export async function preferenceRoutes(app: FastifyInstance) {
  app.get("/preferences", { onRequest: [verifyJwt] }, getPreferenceController);
  app.put("/preferences", { onRequest: [verifyJwt] }, editPreferenceController);
}
