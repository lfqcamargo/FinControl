import { prisma } from "@/infra/lib/prisma";
import { PreferencesRepositoryInterface } from "../interfaces/preferences-repository-interface";
import { Preference, Prisma } from "generated/prisma";

export class PrismaPreferencesRepository
  implements PreferencesRepositoryInterface
{
  create(data: Prisma.PreferenceUncheckedCreateInput): Promise<Preference> {
    throw new Error("Method not implemented.");
  }
  save(data: Preference): Promise<Preference> {
    throw new Error("Method not implemented.");
  }
  async findById(userId: string): Promise<Preference | null> {
    const preference = await prisma.preference.findUnique({
      where: {
        userId,
      },
    });

    return preference;
  }

  async updateByUserId(
    userId: string,
    data: Prisma.PreferenceUpdateInput
  ): Promise<Preference> {
    const updatedPreference = await prisma.preference.update({
      where: {
        userId,
      },
      data,
    });

    return updatedPreference;
  }
}
