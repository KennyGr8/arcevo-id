import { Schema, model, type Document } from 'mongoose';
import { OrganizationRole } from '@prisma-enums';

export interface IOrganizationInvite extends Document {
  email: string;
  organizationId: string;
  role: OrganizationRole;
  invitedById?: string;
  token: string;
  expiresAt: Date;
  acceptedAt?: Date;
  createdAt: Date;
}

const inviteSchema = new Schema<IOrganizationInvite>(
  {
    email: { type: String, required: true },
    organizationId: { type: String, required: true },
    role: { type: String, enum: Object.values(OrganizationRole), default: 'MEMBER' },
    invitedById: String,
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    acceptedAt: Date,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const OrganizationInviteModel = model<IOrganizationInvite>('OrganizationInvite', inviteSchema);
