import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchTransactionsByUserIdUseCase } from "@/infra/factories/transactions/make-fetch-transactions-by-user-id-use-case";

export async function fetchTransactionsByUserIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchTransactionsByUserIdUseCase =
    makeFetchTransactionsByUserIdUseCase();

  const { transactions } = await fetchTransactionsByUserIdUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({ transactions });
}
