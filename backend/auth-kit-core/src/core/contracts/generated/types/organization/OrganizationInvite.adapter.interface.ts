export interface OrganizationInviteAdapter {
  id: String;
  email: String;
  organizationId: String;
  organization: any;
  role: OrganizationRole;
  invitedById?: String;
  invitedBy?: any;
  token: String;
  expiresAt: DateTime;
  acceptedAt?: DateTime;
  createdAt: DateTime;
}
