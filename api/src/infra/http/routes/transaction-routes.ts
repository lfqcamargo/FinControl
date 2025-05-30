import { FastifyInstance } from "fastify";
import { verifyJwt } from "../middlewares/verify-jwt";
import { createTransactionController } from "../controllers/transactions/create-transaction-controller";
import { fetchTransactionsByUserIdController } from "../controllers/transactions/fetch-transactions-by-user-id-controller";
import { findTransactionByIdController } from "../controllers/transactions/find-transaction-by-id-controller";
import { editTransactionController } from "../controllers/transactions/edit-transaction-controller";
import { deleteTransactionController } from "../controllers/transactions/delete-transaction-controller";

export async function transactionsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/transactions", createTransactionController);
  app.get("/transactions", fetchTransactionsByUserIdController);
  app.get("/transactions/:id", findTransactionByIdController);
  app.put("/transactions/:id", editTransactionController);
  app.delete("/transactions/:id", deleteTransactionController);
}
