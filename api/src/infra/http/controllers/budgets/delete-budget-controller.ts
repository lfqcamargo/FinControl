import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteBudgetUseCase } from "@/infra/factories/budgets/make-delete-budget-use-case";
import { ResourceNotFoundError } from "@/domain/use-cases/errors/resource-not-found-error";

export async function deleteBudgetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = paramsSchema.parse(request.params);

  try {
    const deleteBudgetUseCase = makeDeleteBudgetUseCase();

    const result = await deleteBudgetUseCase.execute({
      id,
      userId: request.user.sub,
    });

    if (!result) {
      return reply.status(500).send({ message: "Erro interno." });
    }

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }
}
