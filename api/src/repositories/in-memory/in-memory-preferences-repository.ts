import { UsersRepositoryInterface } from "@/repositories/interfaces/users-repository-interface";
import { User, Prisma } from "generated/prisma";

export class InMemoryUsersRepository implements UsersRepositoryInterface {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: "user-1",
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone || null,
      profilePhoto: data.profilePhoto || null,
    };

    this.items.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = this.items.find((item) => item.phone === phone);

    if (!user) {
      return null;
    }

    return user;
  }

  async save(user: User) {
    const userIndex = this.items.findIndex((item) => item.id === user.id);

    if (userIndex >= 0) {
      this.items[userIndex] = user;
    }

    return user;
  }
}
