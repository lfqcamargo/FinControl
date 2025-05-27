import { InMemoryUsersRepository } from "@/domain/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "@/domain/use-cases/users/authenticate-use-case";
import { InvalidCredentialsError } from "@/domain/use-cases/errors/invalid-credentials-error";
import { hash } from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryPreferencesRepository } from "@/domain/repositories/in-memory/in-memory-preferences-repository";

let usersRepository: InMemoryUsersRepository;
let preferencesRepository: InMemoryPreferencesRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    preferencesRepository = new InMemoryPreferencesRepository();
    usersRepository = new InMemoryUsersRepository(preferencesRepository);
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong email", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
