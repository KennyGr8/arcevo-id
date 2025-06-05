import { AuthLog } from "@generated/prisma";
import { AuthEvent } from "@prisma-enums";

export interface CreateAuthLogInput {
  userId: string;
  event: AuthEvent;
  ip?: string;
  userAgent?: string;
  location?: string;
}

export interface IAuthLogAdapter {
  create(data: CreateAuthLogInput): Promise<AuthLog>;
  findManyByUserId(userId: string): Promise<AuthLog[]>;
  deleteManyByUserId(userId: string): Promise<{ count: number }>;
}
