import { UsersRepositoryInterface } from "@/domain/repositories/interfaces/users-repository-interface";
import { PreferencesRepositoryInterface } from "@/domain/repositories/interfaces/preferences-repository-interface";
import { User, Prisma } from "generated/prisma";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepositoryInterface {
  public items: User[] = [];

  constructor(private preferencesRepository: PreferencesRepositoryInterface) {}

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone || null,
      profilePhoto: data.profilePhoto || null,
    };

    this.items.push(user);

    await this.preferencesRepository.create({
      userId: user.id,
      notificationBudgets: false,
      notificationEmail: false,
      notificationPhone: false,
      notificationReports: false,
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((item) => item.email === email) || null;
  }

  async findById(id: string): Promise<User | null> {
    return this.items.find((item) => item.id === id) || null;
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.items.find((item) => item.phone === phone) || null;
  }

  async save(user: User): Promise<User> {
    const index = this.items.findIndex((item) => item.id === user.id);
    if (index >= 0) this.items[index] = user;
    return user;
  }
}
