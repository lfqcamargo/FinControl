import { User } from "generated/prisma";
import { UsersRepositoryInterface } from "@/domain/repositories/interfaces/users-repository-interface";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { ResourceAlreadyExistsError } from "../errors/resource-already-exists-error";

interface EditUserUseCaseRequest {
  userId: string;
  name: string;
  phone: string | null;
  profilePhoto: Buffer | null;
}

interface EditUserUseCaseResponse {
  user: User;
}

export class EditUserUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    userId,
    name,
    phone,
    profilePhoto,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    user.name = name;

    if (phone == null) {
      user.phone = phone;
    } else if (phone !== user.phone) {
      const userWithSamePhone = await this.usersRepository.findByPhone(phone);

      if (userWithSamePhone) {
        throw new ResourceAlreadyExistsError("Telefone já cadastrado");
      }

      user.phone = phone;
    }

    if (profilePhoto != null) {
      user.profilePhoto = profilePhoto;
    }

    await this.usersRepository.save(user);

    return {
      user: user,
    };
  }
}
