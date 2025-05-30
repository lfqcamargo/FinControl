import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateTransactionUseCase } from "@/infra/factories/transactions/make-create-transaction-use-case";
import { ResourceNotFoundError } from "@/domain/use-cases/errors/resource-not-found-error";

export async function createTransactionController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createTransactionBodySchema = z.object({
    description: z.string(),
    value: z.number(),
    observation: z.string(),
    budgetId: z.number(),
  });

  const { description, value, observation, budgetId } =
    createTransactionBodySchema.parse(request.body);

  try {
    const createTransactionUseCase = makeCreateTransactionUseCase();

    const { transaction } = await createTransactionUseCase.execute({
      description,
      value,
      observation,
      budgetId,
      userId: request.user.sub,
    });

    return reply.status(201).send({ transaction });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
