import type { MfaWebAuthn } from "@generated/prisma";

export interface CreateWebAuthnInput {
  userId: string;
  credentialId: string;
  publicKey: string;
  counter: number;
  deviceName?: string;
}

export interface UpdateWebAuthnInput {
  counter?: number;
  deviceName?: string;
}

export interface IMfaWebAuthnAdapter {
  findAllByUserId(userId: string): Promise<MfaWebAuthn[]>;
  findByCredentialId(credentialId: string): Promise<MfaWebAuthn | null>;
  create(data: CreateWebAuthnInput): Promise<MfaWebAuthn>;
  update(credentialId: string, data: UpdateWebAuthnInput): Promise<MfaWebAuthn>;
  delete(credentialId: string): Promise<void>;
  deleteAll(userId: string): Promise<{ count: number }>;
}
