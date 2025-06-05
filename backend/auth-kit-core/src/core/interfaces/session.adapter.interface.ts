import type { Session } from "@generated/prisma";

export interface CreateSessionInput {
  userId: string;
  ip?: string;
  userAgent?: string;
  refreshToken?: string;
  expiresAt?: Date;
  deviceName?: string;
  platform?: string;
  browser?: string;
  location?: string;
}

export interface UpdateSessionInput {
  ip?: string;
  userAgent?: string;
  refreshToken?: string;
  expiresAt?: Date;
  deviceName?: string;
  platform?: string;
  browser?: string;
  location?: string;
  valid?: boolean;
  lastUsedAt?: Date;
  lastActiveAt?: Date;
}

export interface ISessionAdapter {
  findById(id: string): Promise<Session | null>;
  findAllByUserId(userId: string): Promise<Session[]>;
  create(data: CreateSessionInput): Promise<Session>;
  update(id: string, data: UpdateSessionInput): Promise<Session>;
  revoke(id: string): Promise<Session>;
  revokeAll(userId: string): Promise<{ count: number }>;
  delete(id: string): Promise<void>;
}
