import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeEditUserUseCase } from "@/use-cases/factories/make-edit-user-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { ResourceAlreadyExistsError } from "@/use-cases/errors/resource-already-exists-error";

export async function editUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parts = request.parts();

  const fields: Record<string, string> = {};
  let profilePhotoBuffer: Buffer | null = null;

  for await (const part of parts) {
    if (part.type === "file" && part.fieldname === "profilePhoto") {
      const chunks: Buffer[] = [];
      for await (const chunk of part.file) {
        chunks.push(chunk);
      }
      profilePhotoBuffer = Buffer.concat(chunks);
    } else if (part.type === "field") {
      fields[part.fieldname as string] = part.value as string;
    }
  }

  const schema = z.object({
    name: z.string(),
    phone: z.string().optional(),
  });

  const { name, phone } = schema.parse(fields);

  // if (!profilePhotoBuffer) {
  //   return reply.status(400).send({ message: "Missing profile photo file" });
  // }

  try {
    const editUserUseCase = makeEditUserUseCase();

    const user = await editUserUseCase.execute({
      userId: request.user.sub,
      name,
      phone: phone || null,
      profilePhoto: profilePhotoBuffer || null,
    });

    return reply.status(200).send({
      data: {
        ...user,
        password: undefined,
      },
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    } else if (err instanceof ResourceAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
