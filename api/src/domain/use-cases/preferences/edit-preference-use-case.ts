import { PreferencesRepositoryInterface } from "@/domain/repositories/interfaces/preferences-repository-interface";
import { Preference } from "generated/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface EditPreferenceUseCaseRequest {
  userId: string;
  notificationEmail?: boolean;
  notificationPhone?: boolean;
  notificationBudgets?: boolean;
  notificationReports?: boolean;
}

interface EditPreferenceUseCaseResponse {
  preference: Preference;
}

export class EditPreferenceUseCase {
  constructor(private preferencesRepository: PreferencesRepositoryInterface) {}

  async execute({
    userId,
    notificationEmail,
    notificationPhone,
    notificationBudgets,
    notificationReports,
  }: EditPreferenceUseCaseRequest): Promise<EditPreferenceUseCaseResponse> {
    const preference = await this.preferencesRepository.findById(userId);

    if (!preference) {
      throw new ResourceNotFoundError();
    }

    const updatedPreference = await this.preferencesRepository.save({
      ...preference,
      notificationEmail: notificationEmail ?? preference.notificationEmail,
      notificationPhone: notificationPhone ?? preference.notificationPhone,
      notificationBudgets:
        notificationBudgets ?? preference.notificationBudgets,
      notificationReports:
        notificationReports ?? preference.notificationReports,
    });

    return {
      preference: updatedPreference,
    };
  }
}
