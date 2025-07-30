import { User } from "@generated/prisma";

export type SafeUser = Omit<User, "password" | "deletedAt" | "deactivatedAt" | "otp">;

export type SafeUser = Pick<User, "id" | "name" | "email" | "role">;
