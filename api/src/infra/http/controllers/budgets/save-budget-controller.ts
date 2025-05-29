import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSaveBudgetUseCase } from "@/infra/factories/budgets/make-save-budget-use-case";
import { ResourceNotFoundError } from "@/domain/use-cases/errors/resource-not-found-error";

export async function saveBudgetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    id: z.number(),
    title: z.string(),
    value: z.number(),
    color: z.string(),
    date: z.coerce.date(),
  });

  const { id, title, value, color, date } = bodySchema.parse(request.body);

  try {
    const saveBudgetUseCase = makeSaveBudgetUseCase();

    const budget = await saveBudgetUseCase.execute({
      id,
      userId: request.user.sub,
      title,
      value,
      color,
      date,
    });

    return reply.status(200).send({ budget });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }
}
