import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeEditTransactionUseCase } from "@/infra/factories/transactions/make-edit-transaction-use-case";
import { ResourceNotFoundError } from "@/domain/use-cases/errors/resource-not-found-error";

export async function editTransactionController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const editTransactionParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const editTransactionBodySchema = z.object({
    description: z.string(),
    value: z.number(),
    observation: z.string(),
    budgetId: z.number(),
  });

  const { id } = editTransactionParamsSchema.parse(request.params);
  const { description, value, observation, budgetId } =
    editTransactionBodySchema.parse(request.body);

  try {
    const editTransactionUseCase = makeEditTransactionUseCase();

    const { transaction } = await editTransactionUseCase.execute({
      id,
      description,
      value,
      observation,
      budgetId,
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
