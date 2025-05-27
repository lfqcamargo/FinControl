import { PreferencesRepositoryInterface } from "@/domain/repositories/interfaces/preferences-repository-interface";
import { Preference } from "generated/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetPreferenceUseCaseRequest {
  id: string;
}

interface GetPreferenceUseCaseResponse {
  preference: Preference;
}

export class GetPreferenceUseCase {
  constructor(private preferencesRepository: PreferencesRepositoryInterface) {}

  async execute({
    id,
  }: GetPreferenceUseCaseRequest): Promise<GetPreferenceUseCaseResponse> {
    const preference = await this.preferencesRepository.findById(id);

    if (!preference) {
      throw new ResourceNotFoundError();
    }

    return {
      preference,
    };
  }
}
