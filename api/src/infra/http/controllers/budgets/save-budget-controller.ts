import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSaveBudgetUseCase } from "@/infra/factories/budgets/make-save-budget-use-case";
import { ResourceNotFoundError } from "@/domain/use-cases/errors/resource-not-found-error";

export async function saveBudgetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  });

  const bodySchema = z.object({
    title: z.string(),
    value: z.number().nonnegative(),
    color: z.string().regex(/^#([0-9A-Fa-f]{6})$/, "Invalid hex color"),
    month: z.number().min(1).max(12),
    year: z.number().min(1900),
  });

  const { id } = paramsSchema.parse(request.params);
  const { title, value, color, month, year } = bodySchema.parse(request.body);

  try {
    const saveBudgetUseCase = makeSaveBudgetUseCase();

    // Construct date using received month/year, setting day as 1
    const date = new Date(year, month - 1, 1);

    const budget = await saveBudgetUseCase.execute({
      id,
      userId: request.user.sub,
      title,
      value: Number(value.toFixed(2)), // Ensure two decimal places
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
