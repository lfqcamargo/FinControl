import { PrismaPreferencesRepository } from "@/infra/repositories/prisma/prisma-preferences-repository";
import { EditPreferenceUseCase } from "@/domain/use-cases/preferences/edit-preference-use-case";

export function makeEditPreferenceUseCase() {
  const preferencesRepository = new PrismaPreferencesRepository();
  const editPreferenceUseCase = new EditPreferenceUseCase(
    preferencesRepository
  );

  return editPreferenceUseCase;
}
