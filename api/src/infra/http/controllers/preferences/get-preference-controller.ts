import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetPreferenceUseCase } from "@/infra/factories/preferences/make-get-preference-use-case";
import { ResourceNotFoundError } from "@/domain/use-cases/errors/resource-not-found-error";

export async function getPreferenceController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getPreferenceUseCase = makeGetPreferenceUseCase();

    const { preference } = await getPreferenceUseCase.execute({
      id: request.user.sub,
    });

    const dataPreference = {
      ...preference,
      userId: undefined,
    };

    return reply.status(200).send({ preferences: dataPreference });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
