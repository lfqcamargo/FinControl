import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/domain/repositories/in-memory/in-memory-users-repository";
import { InMemoryPreferencesRepository } from "@/domain/repositories/in-memory/in-memory-preferences-repository";
import { ChangePasswordUseCase } from "./change-password-use-case";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let preferencesRepository: InMemoryPreferencesRepository;
let changePasswordUseCase: ChangePasswordUseCase;

describe("ChangePassword Use Case", () => {
  beforeEach(() => {
    preferencesRepository = new InMemoryPreferencesRepository();
    usersRepository = new InMemoryUsersRepository(preferencesRepository);
    changePasswordUseCase = new ChangePasswordUseCase(usersRepository);
  });

  it("should be able to change the password of an existing user", async () => {
    const user = await usersRepository.create({
      name: "Jane Doe",
      email: "jane@example.com",
      password: await hash("old-password", 6),
      phone: null,
      profilePhoto: null,
    });

    const oldPasswordHash = user.password;

    await changePasswordUseCase.execute({
      userId: user.id,
      currentPassword: "old-password",
      newPassword: "new-secure-password",
    });

    const updatedUser = await usersRepository.findById(user.id);

    expect(updatedUser).toBeTruthy();
    expect(updatedUser!.password).not.toBe("new-secure-password");
    expect(updatedUser!.password).not.toBe(oldPasswordHash);
  });

  it("should not be able to change the password of a non-existent user", async () => {
    await expect(() =>
      changePasswordUseCase.execute({
        userId: "non-existent-id",
        currentPassword: "any-password",
        newPassword: "new-password",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not allow password change if current password is incorrect", async () => {
    const user = await usersRepository.create({
      name: "Jane Doe",
      email: "jane@example.com",
      password: await hash("correct-password", 6),
      phone: null,
      profilePhoto: null,
    });

    await expect(() =>
      changePasswordUseCase.execute({
        userId: user.id,
        currentPassword: "wrong-password",
        newPassword: "new-password",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
