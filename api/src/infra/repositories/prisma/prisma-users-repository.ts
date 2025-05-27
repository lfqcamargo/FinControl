import { prisma } from "@/infra/lib/prisma";
import { UsersRepositoryInterface } from "../interfaces/users-repository-interface";
import { Prisma, User, Preference } from "generated/prisma";

export class PrismaUsersRepository implements UsersRepositoryInterface {
  async create(data: Prisma.UserCreateInput) {
    const userId = crypto.randomUUID();

    const userCreateInput: Prisma.UserCreateInput = {
      ...data,
      id: userId,
    };

    const preferenceCreateInput: Prisma.PreferenceCreateInput = {
      user: {
        connect: { id: userId },
      },
      notificationPhone: false,
      notificationEmail: false,
      notificationBudgets: false,
      notificationReports: false,
    };

    const [user] = await prisma.$transaction([
      prisma.user.create({ data: userCreateInput }),
      prisma.preference.create({ data: preferenceCreateInput }),
    ]);

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
