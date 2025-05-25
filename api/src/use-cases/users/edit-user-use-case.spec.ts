import { describe, it, expect, beforeEach } from "vitest";
import { EditUserUseCase } from "./edit-user-use-case";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { hash } from "bcryptjs";
import { ResourceAlreadyExistsError } from "../errors/resource-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let editUserUseCase: EditUserUseCase;

describe("EditUser Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    editUserUseCase = new EditUserUseCase(usersRepository);
  });

  it("should be able to edit an existing user", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: await hash("123456", 6),
      phone: null,
      profilePhoto: null,
    });

    const response = await editUserUseCase.execute({
      userId: user.id,
      name: "Updated Name",
      phone: "123456789",
      profilePhoto: Buffer.from("fake-photo"),
    });

    expect(response.user.name).toBe("Updated Name");
    expect(response.user.phone).toBe("123456789");
    expect(response.user.profilePhoto).toEqual(Buffer.from("fake-photo"));
  });

  it("should not be able to edit a non-existent user", async () => {
    await expect(() =>
      editUserUseCase.execute({
        userId: "non-existent-id",
        name: "Test",
        phone: "000000000",
        profilePhoto: null,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be possible to edit the phone if one already exists", async () => {
    const editUser = await usersRepository.create({
      name: "Lucas Camargo",
      email: "lfqcamargo@gmail.com",
      password: await hash("123456", 6),
      phone: null,
      profilePhoto: null,
    });

    await usersRepository.create({
      name: "John Doe",
      email: "john@example.com.br",
      password: await hash("123456", 6),
      phone: "123456789",
      profilePhoto: null,
    });

    await expect(
      editUserUseCase.execute({
        userId: editUser.id,
        name: "Updated Name",
        phone: "123456789",
        profilePhoto: Buffer.from("fake-photo"),
      })
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError);
  });
});
