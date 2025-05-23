import { FastifyInstance } from "fastify";
import { createUser } from "./controllers/users/create-user-controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", createUser);
}
