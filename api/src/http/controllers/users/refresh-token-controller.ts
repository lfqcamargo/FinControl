import { FastifyReply, FastifyRequest } from "fastify";

export async function refreshTokenController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await request.jwtVerify({ onlyCookie: true });

  const accessToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    }
  );

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d",
      },
    }
  );

  return reply
    .status(200)
    .setCookie("accessToken", accessToken, {
      httpOnly: true, // JavaScript não pode acessar
      secure: true, // HTTPS only
      sameSite: "strict", // Proteção CSRF
      maxAge: 15 * 60 * 1000, // 15 minutos
    })
    .setCookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    })
    .send();
}
