import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import { userRoutes } from "@/http/routes/user-routes";
import { ZodError } from "zod";
import { env } from "@/env";
import fastifyJwt from "@fastify/jwt";
import cors from "@fastify/cors";

export const app = fastify();

app.register(cors, {
  origin: true,
  credentials: true,
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(userRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: "Internal server error." });
});
