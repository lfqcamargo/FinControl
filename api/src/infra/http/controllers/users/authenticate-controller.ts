import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "@/domain/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/infra/factories/users/make-authenticate-use-case";

const isProduction = process.env.NODE_ENV === "production";

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const accessToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      }
    );

    return reply
      .status(200)
      .setCookie("accessToken", accessToken, {
        httpOnly: true, // JavaScript não pode acessar
        secure: isProduction, // HTTPS only
        sameSite: "strict", // Proteção CSRF
        maxAge: 15 * 60 * 1000, // 15 minutos
      })
      .setCookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
      })
      .send();
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: err.message });
    }

    throw err;
  }
}
