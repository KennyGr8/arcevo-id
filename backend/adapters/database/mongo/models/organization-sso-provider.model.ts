import { Schema, model, type Document } from 'mongoose';

export interface IOrganizationSSOProvider extends Document {
  organizationId: string;
  provider: string;
  ssoConfig: Record<string, any>;
  createdAt: Date;
}

const ssoSchema = new Schema<IOrganizationSSOProvider>(
  {
    organizationId: { type: String, required: true },
    provider: { type: String, required: true },
    ssoConfig: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const OrganizationSSOProviderModel = model<IOrganizationSSOProvider>('OrganizationSSOProvider', ssoSchema);
