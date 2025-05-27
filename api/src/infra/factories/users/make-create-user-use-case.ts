import { CreateUserUseCase } from "@/domain/use-cases/users/create-user-use-case";
import { PrismaUsersRepository } from "@/infra/repositories/prisma/prisma-users-repository";

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);

  return createUserUseCase;
}
