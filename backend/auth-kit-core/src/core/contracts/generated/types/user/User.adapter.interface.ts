export interface UserAdapter {
  id: String;
  email: String;
  password?: String;
  name?: String;
  emailVerified?: DateTime;
  role: Role;
  createdAt: DateTime;
  updatedAt: DateTime;
  isDeactivated: Boolean;
  deletedAt?: DateTime;
  status: UserStatus;
  authLogs: any;
  sessions: any;
  mfa?: any;
  activityLogs: any;
  accounts: any;
  tokens: any;
  subscription?: any;
  auditLogs: any;
  organizationInvitesSent: any;
  organizationMemberships: any;
  organizationMembershipsInvited: any;
  billingEvents: any;
}
