import { CreateUserUseCase } from "@/use-cases/users/create-user-use-case";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);

  return createUserUseCase;
}
