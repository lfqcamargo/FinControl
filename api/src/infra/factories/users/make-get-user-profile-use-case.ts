import { GetUserProfileUseCase } from "@/domain/use-cases/users/get-user-profile-use-case";
import { PrismaUsersRepository } from "@/infra/repositories/prisma/prisma-users-repository";

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);

  return getUserProfileUseCase;
}
