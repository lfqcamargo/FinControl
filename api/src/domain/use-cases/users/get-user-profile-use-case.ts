import { UsersRepositoryInterface } from "@/domain/repositories/interfaces/users-repository-interface";
import { User } from "generated/prisma";
import { ResourceNotFoundError } from "@/domain/use-cases/errors/resource-not-found-error";

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
