import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchBudgetsByUserIdUseCase } from "@/infra/factories/budgets/make-fetch-by-user-id-use-case";
import { z } from "zod";

export async function fetchBudgetsByUserIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const querySchema = z.object({
      month: z.coerce.number().min(1).max(12),
      year: z.coerce.number().min(1900).max(2100),
    });

    const { month, year } = querySchema.parse(request.query);
    const date = new Date(year, month - 1, 1);

    const fetchBudgetsUseCase = makeFetchBudgetsByUserIdUseCase();

    const budgets = await fetchBudgetsUseCase.execute({
      userId: request.user.sub,
      date,
    });

    return reply.status(200).send({ budgets });
  } catch (err) {
    throw err;
  }
}
