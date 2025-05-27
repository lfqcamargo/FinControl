import { prisma } from "@/infra/lib/prisma";
import { PreferencesRepositoryInterface } from "@/domain/repositories/interfaces/preferences-repository-interface";
import { Preference, Prisma } from "generated/prisma";

export class PrismaPreferencesRepository
  implements PreferencesRepositoryInterface
{
  async findById(userId: string): Promise<Preference | null> {
    const preference = await prisma.preference.findUnique({
      where: {
        userId,
      },
    });

    if (!preference) {
      return null;
    }

    return preference;
  }

  async save(data: Preference): Promise<Preference> {
    const updatedPreference = await prisma.preference.update({
      where: {
        userId: data.userId,
      },
      data,
    });

    return updatedPreference;
  }
}
