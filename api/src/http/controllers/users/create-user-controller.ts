import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeCreateUserUseCase } from "@/use-cases/factories/make-create-user-use-case";

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createUserBodySchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6),
  });

  const { email, name, password } = createUserBodySchema.parse(request.body);

  try {
    const createUserUseCase = makeCreateUserUseCase();

    await createUserUseCase.execute({
      email,
      name,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
