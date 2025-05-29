import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchBudgetsByUserIdUseCase } from "@/infra/factories/budgets/make-fetch-by-user-id-use-case";

export async function fetchBudgetsByUserIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const fetchBudgetsUseCase = makeFetchBudgetsByUserIdUseCase();

    const budgets = await fetchBudgetsUseCase.execute({
      userId: request.user.sub,
    });

    return reply.status(200).send({ budgets });
  } catch (err) {
    throw err;
  }
}
