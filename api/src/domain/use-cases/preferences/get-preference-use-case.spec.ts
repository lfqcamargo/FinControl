import { InMemoryPreferencesRepository } from "@/domain/repositories/in-memory/in-memory-preferences-repository";
import { InMemoryUsersRepository } from "@/domain/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "@/domain/use-cases/errors/resource-not-found-error";
import { GetPreferenceUseCase } from "@/domain/use-cases/preferences/get-preference-use-case";
import { hash } from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";

let usersRepository: InMemoryUsersRepository;
let preferencesRepository: InMemoryPreferencesRepository;
let sut: GetPreferenceUseCase;

describe("Get Preference  Use Case", () => {
  beforeEach(() => {
    preferencesRepository = new InMemoryPreferencesRepository();
    usersRepository = new InMemoryUsersRepository(preferencesRepository);
    sut = new GetPreferenceUseCase(preferencesRepository);
  });

  it("should be able to get preference ", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: await hash("123456", 6),
    });

    const { preference } = await sut.execute({
      id: user.id,
    });

    expect(preference.userId).toEqual(user.id);
  });

  it("should not be able to get preference  with wrong id", async () => {
    await expect(() =>
      sut.execute({
        id: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
