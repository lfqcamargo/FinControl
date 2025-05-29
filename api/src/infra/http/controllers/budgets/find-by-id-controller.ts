import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFindBudgetByIdUseCase } from "@/infra/factories/budgets/make-find-by-id-use-case";
import { ResourceNotFoundError } from "@/domain/use-cases/errors/resource-not-found-error";

export async function findBudgetByIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = paramsSchema.parse(request.params);

  try {
    const findBudgetUseCase = makeFindBudgetByIdUseCase();

    const budget = await findBudgetUseCase.execute({
      id,
      userId: request.user.sub,
    });

    return reply.status(200).send({ budget });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }
}
