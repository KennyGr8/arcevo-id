import type { User } from "@database/prisma";
import type { Role, UserStatus } from "@/common/constants/prisma-enums";

export interface CreateUserInput {
  email: string;
  password?: string;
  name?: string;
  role?: Role;
}

export interface UpdateUserInput {
  name?: string;
  password?: string;
  role?: Role;
  status?: UserStatus;
  emailVerified?: Date;
}

export interface IUserAdapter {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserInput): Promise<User>;
  update(id: string, data: UpdateUserInput): Promise<User>;
  delete(id: string): Promise<void>;

  markEmailVerified(id: string, date?: Date): Promise<User>;
  softDelete(id: string): Promise<User>;
  setStatus(id: string, status: UserStatus): Promise<User>;
}
