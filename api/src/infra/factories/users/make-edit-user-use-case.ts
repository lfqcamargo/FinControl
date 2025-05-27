import { PrismaUsersRepository } from "@/infra/repositories/prisma/prisma-users-repository";
import { EditUserUseCase } from "@/domain/use-cases/users/edit-user-use-case";

export function makeEditUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new EditUserUseCase(usersRepository);

  return useCase;
}
