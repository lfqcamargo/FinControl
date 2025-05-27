import { PreferencesRepositoryInterface } from "@/domain/repositories/interfaces/preferences-repository-interface";
import { Preference, Prisma } from "generated/prisma";

export class InMemoryPreferencesRepository
  implements PreferencesRepositoryInterface
{
  public items: Preference[] = [];

  async create(data: Prisma.PreferenceUncheckedCreateInput) {
    const preference = {
      userId: data.userId,
      notificationPhone: data.notificationPhone || false,
      notificationEmail: data.notificationEmail || false,
      notificationBudgets: data.notificationBudgets || false,
      notificationReports: data.notificationReports || false,
    };
    this.items.push(preference);

    return preference;
  }

  async findById(userId: string): Promise<Preference | null> {
    const preference = this.items.find((item) => item.userId === userId);

    if (!preference) {
      return null;
    }

    return preference;
  }

  async save(preference: Preference) {
    const preferenceIndex = this.items.findIndex(
      (item) => item.userId === preference.userId
    );

    if (preferenceIndex >= 0) {
      this.items[preferenceIndex] = preference;
    }

    return preference;
  }
}
