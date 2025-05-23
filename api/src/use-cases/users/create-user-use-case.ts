import { hash } from "bcryptjs";
import { User } from "generated/prisma";
import { UsersRepositoryInterface } from "@/repositories/interfaces/users-repository-interface";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

interface CreateUserUseCaseRequest {
  email: string;
  password: string;
  name: string;
}

interface CreateUserUseCaseResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    email,
    password,
    name,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    const user = await this.usersRepository.create({
      email,
      password: password_hash,
      name,
    });

    return {
      user,
    };
  }
}
