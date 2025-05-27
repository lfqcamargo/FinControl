import { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/users/create-user-controller";
import { authenticateController } from "../controllers/users/authenticate-controller";
import { getUserProfileController } from "../controllers/users/get-user-profile-controller";
import { verifyJwt } from "@/infra/http/middlewares/verify-jwt";
import { refreshTokenController } from "../controllers/users/refresh-token-controller";
import { logoutController } from "../controllers/users/logout-controller";
import { editUserController } from "../controllers/users/edit-user-controller";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", createUserController);

  app.put("/users", { onRequest: [verifyJwt] }, editUserController);

  /* Authentication */
  app.post("/auth", authenticateController);
  app.patch("/auth/refresh", refreshTokenController);
  app.get("/auth/me", { onRequest: [verifyJwt] }, getUserProfileController);
  app.post("/auth/logout", { onRequest: [verifyJwt] }, logoutController);
}
