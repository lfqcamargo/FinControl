import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeEditPreferenceUseCase } from "@/infra/factories/preferences/make-edit-preference-use-case";
import { ResourceNotFoundError } from "@/domain/use-cases/errors/resource-not-found-error";

export async function editPreferenceController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    notificationPhone: z.boolean(),
    notificationEmail: z.boolean(),
    notificationBudgets: z.boolean(),
    notificationReports: z.boolean(),
  });

  const {
    notificationPhone,
    notificationEmail,
    notificationBudgets,
    notificationReports,
  } = bodySchema.parse(request.body);

  try {
    const editPreferenceUseCase = makeEditPreferenceUseCase();

    const preference = await editPreferenceUseCase.execute({
      userId: request.user.sub,
      notificationPhone,
      notificationEmail,
      notificationBudgets,
      notificationReports,
    });

    return reply.status(200).send({ data: preference });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
