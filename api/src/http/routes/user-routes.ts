import { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/users/create-user-controller";
import { authenticateController } from "../controllers/users/authenticate-controller";
import { getUserProfileController } from "../controllers/users/get-user-profile-controller";
import { verifyJwt } from "@/middlewares/verify-jwt";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", createUserController);
  app.post("/sessions", authenticateController);

  app.get("/profile", { onRequest: [verifyJwt] }, getUserProfileController);
}
