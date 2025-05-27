import { PrismaPreferencesRepository } from "@/infra/repositories/prisma/prisma-preferences-repository";
import { GetPreferenceUseCase } from "@/domain/use-cases/preferences/get-preference-use-case";

export function makeGetPreferenceUseCase() {
  const preferencesRepository = new PrismaPreferencesRepository();
  const getPreferenceUseCase = new GetPreferenceUseCase(preferencesRepository);

  return getPreferenceUseCase;
}
