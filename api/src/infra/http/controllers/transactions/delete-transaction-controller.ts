import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteTransactionUseCase } from "@/infra/factories/transactions/make-delete-transaction-use-case";
import { ResourceNotFoundError } from "@/domain/use-cases/errors/resource-not-found-error";

export async function deleteTransactionController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteTransactionParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = deleteTransactionParamsSchema.parse(request.params);

  try {
    const deleteTransactionUseCase = makeDeleteTransactionUseCase();

    await deleteTransactionUseCase.execute({
      id,
      userId: request.user.sub,
    });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
