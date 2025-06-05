import { Mfa } from "@generated/prisma";

export interface CreateMfaTotpInput {
  userId: string;
  secret: string;
  verified?: boolean;
  backupCodes?: string[];
}

export interface UpdateMfaTotpInput {
  secret?: string;
  verified?: boolean;
  backupCodes?: string[];
}

export interface IMfaTotpAdapter {
  findByUserId(userId: string): Promise<Mfa | null>;
  create(data: CreateMfaTotpInput): Promise<Mfa>;
  update(userId: string, data: UpdateMfaTotpInput): Promise<Mfa>;
  delete(userId: string): Promise<void>;
}
