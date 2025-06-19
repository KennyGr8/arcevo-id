export interface OrganizationMembershipAdapter {
  id: String;
  userId: String;
  user: any;
  organizationId: String;
  organization: any;
  role: OrganizationRole;
  invitedById?: String;
  invitedBy?: any;
  createdAt: DateTime;
  updatedAt: DateTime;
}
