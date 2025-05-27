import { Prisma, Preference } from "generated/prisma";

export interface PreferencesRepositoryInterface {
  findById(id: string): Promise<Preference | null>;
  save(data: Preference): Promise<Preference>;
}
