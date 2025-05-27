import { InMemoryPreferencesRepository } from "@/domain/repositories/in-memory/in-memory-preferences-repository";
import { InMemoryUsersRepository } from "@/domain/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "@/domain/use-cases/errors/resource-not-found-error";
import { GetUserProfileUseCase } from "@/domain/use-cases/users/get-user-profile-use-case";
import { hash } from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";

let usersRepository: InMemoryUsersRepository;
let preferencesRepository: InMemoryPreferencesRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    preferencesRepository = new InMemoryPreferencesRepository();
    usersRepository = new InMemoryUsersRepository(preferencesRepository);
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual("John Doe");
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
