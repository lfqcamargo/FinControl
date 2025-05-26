import { Prisma, Preference } from "generated/prisma";

export interface PreferencesRepositoryInterface {
  create(data: Prisma.PreferenceCreateInput): Promise<Preference>;
  findById(id: string): Promise<Preference | null>;
  save(data: Preference): Promise<Preference>;
}
