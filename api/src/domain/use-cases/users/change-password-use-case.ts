import { UsersRepositoryInterface } from "@/domain/repositories/interfaces/users-repository-interface";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { User } from "generated/prisma";
import { compare, hash } from "bcryptjs";

interface ChangePasswordUseCaseRequest {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

interface ChangePasswordUseCaseResponse {
  user: User;
}

export class ChangePasswordUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    userId,
    currentPassword,
    newPassword,
  }: ChangePasswordUseCaseRequest): Promise<ChangePasswordUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    console.log(user);
    if (!user) {
      console.log("teste");
      throw new ResourceNotFoundError();
    }

    const doesPasswordMatch = await compare(currentPassword, user.password);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    const hashedNewPassword = await hash(newPassword, 8);

    user.password = hashedNewPassword;

    await this.usersRepository.save(user);

    return {
      user,
    };
  }
}
