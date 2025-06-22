import { Schema, model, type Document } from 'mongoose';

export interface IOrganization extends Document {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const organizationSchema = new Schema<IOrganization>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const OrganizationModel = model<IOrganization>('Organization', organizationSchema);
