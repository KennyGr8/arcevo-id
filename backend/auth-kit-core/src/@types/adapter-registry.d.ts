import {
  IUserAdapter,
  ISessionAdapter,
  IAuthLogAdapter,
  IActivityLogAdapter,
  IAdminAuditLogAdapter,
  IOAuthAccountAdapter,
  IEmailTokenAdapter,
  IMFAAdapter,
  IMFABackupCodeAdapter,
  ISubscriptionAdapter,
  IBillingEventAdapter,
  IOrganizationDomainAdapter,
  IOrganizationInviteAdapter,
  IOrganizationMembershipAdapter,
  IOrganizationSSOProviderAdapter,
} from "@interfaces/database";

export interface AdapterRegistry {
  user: IUserAdapter;
  session: ISessionAdapter;
  authLog: IAuthLogAdapter;
  activityLog: IActivityLogAdapter;
  adminAuditLog: IAdminAuditLogAdapter;
  oauthAccount: IOAuthAccountAdapter;
  emailToken: IEmailTokenAdapter;
  mfa: IMFAAdapter;
  mfaBackupCode: IMFABackupCodeAdapter;
  subscription: ISubscriptionAdapter;
  billingEvent: IBillingEventAdapter;
  organizationDomain: IOrganizationDomainAdapter;
  organizationInvite: IOrganizationInviteAdapter;
  organizationMembership: IOrganizationMembershipAdapter;
  organizationSSOProvider: IOrganizationSSOProviderAdapter;
}
