import { Prisma, User } from "generated/prisma";

export interface UsersRepositoryInterface {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByPhone(phone: string): Promise<User | null>;
  save(data: User): Promise<User>;
}
