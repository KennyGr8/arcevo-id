export interface OrganizationSSOProviderAdapter {
  id: String;
  organizationId: String;
  organization: any;
  provider: String;
  ssoConfig: Json;
  createdAt: DateTime;
}
