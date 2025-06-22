import { Schema, model, type Document } from 'mongoose';
import { OrganizationRole } from '@prisma-enums';

export interface IOrganizationMembership extends Document {
  userId: string;
  organizationId: string;
  role: OrganizationRole;
  invitedById?: string;
  createdAt: Date;
  updatedAt: Date;
}

const membershipSchema = new Schema<IOrganizationMembership>(
  {
    userId: { type: String, required: true },
    organizationId: { type: String, required: true },
    role: { type: String, enum: Object.values(OrganizationRole), default: 'MEMBER' },
    invitedById: String,
  },
  { timestamps: true }
);

membershipSchema.index({ userId: 1, organizationId: 1 }, { unique: true });

export const OrganizationMembershipModel = model<IOrganizationMembership>('OrganizationMembership', membershipSchema);
