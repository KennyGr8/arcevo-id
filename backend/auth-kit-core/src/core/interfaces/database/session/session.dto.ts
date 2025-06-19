// session.dto.ts

export type CreateSessionDto = {
  userId: string;
  ip?: string;
  userAgent?: string;
  deviceName?: string;
  platform?: string;
  browser?: string;
  location?: string;
  refreshToken?: string;
  valid?: boolean;
  expiresAt?: Date;
  firstSeenAt?: Date;
  lastUsedAt?: Date;
  lastActiveAt?: Date;
};

export type UpdateSessionDto = Partial<{
  ip: string;
  userAgent: string;
  deviceName: string;
  platform: string;
  browser: string;
  location: string;
  refreshToken: string;
  valid: boolean;
  expiresAt: Date;
  lastUsedAt: Date;
  lastActiveAt: Date;
}>;
