import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFindTransactionByIdUseCase } from "@/infra/factories/transactions/make-find-by-id-transaction-use-case";
import { ResourceNotFoundError } from "@/domain/use-cases/errors/resource-not-found-error";

export async function findTransactionByIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const findTransactionByIdParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = findTransactionByIdParamsSchema.parse(request.params);

  try {
    const findTransactionByIdUseCase = makeFindTransactionByIdUseCase();

    const { transaction } = await findTransactionByIdUseCase.execute({
      id,
      userId: request.user.sub,
    });

    return reply.status(200).send({ transaction });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
