import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateBudgetUseCase } from "@/infra/factories/budgets/make-create-budget-use-case";
import { ResourceNotFoundError } from "@/domain/use-cases/errors/resource-not-found-error";

export async function createBudgetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    title: z.string(),
    value: z.number(),
    color: z.string().regex(/^#([0-9A-Fa-f]{6})$/, "Invalid hex color"),
    date: z.string().refine((dateStr) => !isNaN(Date.parse(dateStr)), {
      message: "Invalid date format",
    }),
  });

  const { title, value, color, date } = bodySchema.parse(request.body);

  try {
    const createBudgetUseCase = makeCreateBudgetUseCase();

    const result = await createBudgetUseCase.execute({
      userId: request.user.sub,
      title,
      value,
      color,
      date: new Date(date),
    });

    return reply.status(201).send({ data: result.budget });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
