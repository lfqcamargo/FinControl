import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeCreateUserUseCase } from "@/use-cases/factories/make-create-user-use-case";

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createUserBodySchema = z.object({
    name: z
      .string()
      .trim()
      .min(8)
      .max(100)
      .refine((val) => val.split(" ").length >= 2, {
        message: "Informe o nome completo (nome e sobrenome)",
      }),
    email: z.string().trim().email(),
    password: z
      .string()
      .min(8)
      .max(20)
      .regex(/[A-Z]/)
      .regex(/[a-z]/)
      .regex(/[0-9]/)
      .regex(/[^A-Za-z0-9]/),
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
