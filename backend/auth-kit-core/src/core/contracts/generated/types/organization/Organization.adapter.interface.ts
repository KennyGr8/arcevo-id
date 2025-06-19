export interface OrganizationAdapter {
  id: String;
  name: String;
  slug: String;
  createdAt: DateTime;
  updatedAt: DateTime;
  memberships: any;
  domains: any;
  invites: any;
  ssoProviders: any;
}
