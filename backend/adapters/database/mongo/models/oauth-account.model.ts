import { Schema, model, type Document } from 'mongoose';
import { OAuthProvider } from '@prisma-enums';

export interface IOAuthAccount extends Document {
  userId: string;
  provider: OAuthProvider;
  providerUserId: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
  createdAt: Date;
}

const oauthAccountSchema = new Schema<IOAuthAccount>(
  {
    userId: { type: String, required: true },
    provider: { type: String, enum: Object.values(OAuthProvider), required: true },
    providerUserId: { type: String, required: true },
    accessToken: String,
    refreshToken: String,
    expiresAt: Date,
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

oauthAccountSchema.index({ provider: 1, providerUserId: 1 }, { unique: true });

export const OAuthAccountModel = model<IOAuthAccount>('OAuthAccount', oauthAccountSchema);
