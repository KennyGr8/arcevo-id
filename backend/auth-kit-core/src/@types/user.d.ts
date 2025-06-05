import { User } from "@generated/prisma";

export type SafeUser = Omit<User, "password" | "deletedAt" | "deactivatedAt" | "otp">; // customize as needed

export type SafeUser = Pick<User, "id" | "name" | "email" | "role">;
