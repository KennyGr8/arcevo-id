import { UserStatus } from "@prisma-enums"

export type CreateUserDto = {
  email: string;
  username?: string;
  passwordHash?: string;
  displayName?: string;
  avatarUrl?: string;
  phoneNumber?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  status?: UserStatus;
  metadata?: Record<string, any>;
};

export type UpdateUserDto = Partial<{
  username: string;
  displayName: string;
  avatarUrl: string;
  phoneNumber: string;
  passwordHash: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  status: UserStatus;
  metadata: Record<string, any>;
};
