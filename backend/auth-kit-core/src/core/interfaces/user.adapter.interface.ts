import { Role, UserStatus } from "@prisma-enums";
import { User } from "@generated/prisma";

export interface CreateUserInput {
  email: string;
  password?: string;
  name?: string;
  role?: Role;
}

export interface UpdateUserInput {
  name?: string;
  password?: string;
  emailVerified?: Date | null;
  role?: Role;
  status?: UserStatus;
  isDeactivated?: boolean;
  deletedAt?: Date | null;
}

export abstract class IUserAdapter {
  abstract createUser(data: CreateUserInput): Promise<User>;
  abstract findUserById(id: string): Promise<User | null>;
  abstract findUserByEmail(email: string): Promise<User | null>;
  abstract updateUser(id: string, data: UpdateUserInput): Promise<User>;
  abstract deleteUser(id: string): Promise<void>;
  abstract softDeleteUser(id: string): Promise<User>;
  abstract listUsers(params?: {
    status?: UserStatus;
    role?: Role;
    skip?: number;
    take?: number;
  }): Promise<User[]>;
}
