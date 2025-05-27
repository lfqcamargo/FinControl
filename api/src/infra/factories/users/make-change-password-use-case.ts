import { ChangePasswordUseCase } from "@/domain/use-cases/users/change-password-use-case";
import { PrismaUsersRepository } from "@/infra/repositories/prisma/prisma-users-repository";

export function makeChangePasswordUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const changePassword = new ChangePasswordUseCase(usersRepository);

  return changePassword;
}
