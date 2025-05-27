import { InMemoryUsersRepository } from "@/domain/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "@/domain/use-cases/errors/user-already-exists-error";

import { compare } from "bcryptjs";
import { expect, describe, it } from "vitest";
import { CreateUserUseCase } from "./create-user-use-case";
import { InMemoryPreferencesRepository } from "@/domain/repositories/in-memory/in-memory-preferences-repository";

describe("CreateUser Use Case", () => {
  it("should to create user", async () => {
    const preferencesRepository = new InMemoryPreferencesRepository();
    const usersRepository = new InMemoryUsersRepository(preferencesRepository);
    const createUserUseCase = new CreateUserUseCase(usersRepository);

    const { user } = await createUserUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const preferencesRepository = new InMemoryPreferencesRepository();
    const usersRepository = new InMemoryUsersRepository(preferencesRepository);
    const createUserUseCase = new CreateUserUseCase(usersRepository);

    const { user } = await createUserUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare("123456", user.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const preferencesRepository = new InMemoryPreferencesRepository();
    const usersRepository = new InMemoryUsersRepository(preferencesRepository);
    const createUserUseCase = new CreateUserUseCase(usersRepository);

    const email = "johndoe@example.com";

    await createUserUseCase.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      createUserUseCase.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
