import { Schema, model, type Document } from 'mongoose';
import { TokenType } from '@prisma-enums';

export interface IEmailToken extends Document {
  email: string;
  token: string;
  type: TokenType;
  expiresAt: Date;
  userId?: string;
  createdAt: Date;
}

const emailTokenSchema = new Schema<IEmailToken>(
  {
    email: { type: String, required: true },
    token: { type: String, required: true, unique: true },
    type: { type: String, enum: Object.values(TokenType), required: true },
    expiresAt: { type: Date, required: true },
    userId: { type: String },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

export const EmailTokenModel = model<IEmailToken>('EmailToken', emailTokenSchema);
