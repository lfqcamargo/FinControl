import { prisma } from "@/lib/prisma";
import { UsersRepositoryInterface } from "../interfaces/users-repository-interface";
import { Prisma, User } from "generated/prisma";

export class PrismaUsersRepository implements UsersRepositoryInterface {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByPhone(phone: string) {
    const user = await prisma.user.findUnique({
      where: {
        phone,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async save(data: User) {
    const user = await prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });

    return user;
  }
}
