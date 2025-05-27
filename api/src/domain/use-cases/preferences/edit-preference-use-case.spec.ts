import { InMemoryPreferencesRepository } from "@/domain/repositories/in-memory/in-memory-preferences-repository";
import { InMemoryUsersRepository } from "@/domain/repositories/in-memory/in-memory-users-repository";
import { EditPreferenceUseCase } from "@/domain/use-cases/preferences/edit-preference-use-case";
import { hash } from "bcryptjs";
import { describe, it, beforeEach, expect } from "vitest";
import { ResourceNotFoundError } from "@/domain/use-cases/errors/resource-not-found-error";

let preferencesRepository: InMemoryPreferencesRepository;
let usersRepository: InMemoryUsersRepository;
let sut: EditPreferenceUseCase;

describe("Edit Preference Use Case", () => {
  beforeEach(async () => {
    preferencesRepository = new InMemoryPreferencesRepository();
    usersRepository = new InMemoryUsersRepository(preferencesRepository);
    sut = new EditPreferenceUseCase(preferencesRepository);
  });

  it("should be able to edit a user preference", async () => {
    const user = await usersRepository.create({
      name: "Jane Doe",
      email: "janedoe@example.com",
      password: await hash("123456", 6),
    });

    const { preference } = await sut.execute({
      userId: user.id,
      notificationEmail: true,
      notificationPhone: true,
    });

    expect(preference.notificationEmail).toBe(true);
    expect(preference.notificationPhone).toBe(true);
    expect(preference.userId).toBe(user.id);
  });

  it("should not edit preferences of non-existing user", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
        notificationEmail: true,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
