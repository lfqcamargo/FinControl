import { PrismaUsersRepository } from "@/infra/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/domain/use-cases/users/authenticate-use-case";

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}
