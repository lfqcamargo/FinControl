import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeChangePasswordUseCase } from "@/infra/factories/users/make-change-password-use-case";
import { InvalidCredentialsError } from "@/domain/use-cases/errors/invalid-credentials-error";
import { ResourceNotFoundError } from "@/domain/use-cases/errors/resource-not-found-error";

export async function changePasswordController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const changePasswordBodySchema = z.object({
    currentPassword: z.string().min(8).max(20),
    newPassword: z
      .string()
      .min(8)
      .max(20)
      .regex(/[A-Z]/)
      .regex(/[a-z]/)
      .regex(/[0-9]/)
      .regex(/[^A-Za-z0-9]/),
  });

  const { currentPassword, newPassword } = changePasswordBodySchema.parse(
    request.body
  );

  const userId = request.user.sub;

  try {
    const changePasswordUseCase = makeChangePasswordUseCase();

    await changePasswordUseCase.execute({
      userId,
      currentPassword,
      newPassword,
    });

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: "Senha atual incorreta" });
    }

    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: "Usuário não encontrado" });
    }

    throw err;
  }
}
