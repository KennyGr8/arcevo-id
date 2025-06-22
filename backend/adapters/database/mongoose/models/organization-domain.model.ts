import { Schema, model, type Document } from 'mongoose';

export interface IOrganizationDomain extends Document {
  organizationId: string;
  domain: string;
  verified: boolean;
}

const domainSchema = new Schema<IOrganizationDomain>(
  {
    organizationId: { type: String, required: true },
    domain: { type: String, required: true, unique: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: false }
);

export const OrganizationDomainModel = model<IOrganizationDomain>('OrganizationDomain', domainSchema);
