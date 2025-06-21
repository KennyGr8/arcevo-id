// backend/auth-kit-core/src/core/adapters/database/register/custom/index.ts

import type { AdapterRegistry } from "@/@types/adapter-registry";

// ✅ Import your Custom adapter implementations
import { CustomUserAdapter } from "./user.adapter";
import { CustomSessionAdapter } from "./session.adapter";
import { CustomAuthLogAdapter } from "./auth-log.adapter";
import { CustomActivityLogAdapter } from "./activity-log.adapter";
import { CustomAdminAuditLogAdapter } from "./admin-audit-log.adapter";
import { CustomOAuthAccountAdapter } from "./oauth-account.adapter";
import { CustomEmailTokenAdapter } from "./email-token.adapter";
import { CustomMFAAdapter } from "./mfa.adapter";
import { CustomMFABackupCodeAdapter } from "./mfa-backup-code.adapter";
import { CustomSubscriptionAdapter } from "./subscription.adapter";
import { CustomBillingEventAdapter } from "./billing-event.adapter";
import { CustomOrganizationDomainAdapter } from "./organization-domain.adapter";
import { CustomOrganizationInviteAdapter } from "./organization-invite.adapter";
import { CustomOrganizationMembershipAdapter } from "./organization-membership.adapter";
import { CustomOrganizationSSOProviderAdapter } from "./organization-sso-provider.adapter";

// ✅ Custom Registry Implementation
export const CustomAdapterRegistry: AdapterRegistry = {
  user: CustomUserAdapter,
  session: CustomSessionAdapter,
  authLog: CustomAuthLogAdapter,
  activityLog: CustomActivityLogAdapter,
  adminAuditLog: CustomAdminAuditLogAdapter,
  oauthAccount: CustomOAuthAccountAdapter,
  emailToken: CustomEmailTokenAdapter,
  mfa: CustomMFAAdapter,
  mfaBackupCode: CustomMFABackupCodeAdapter,
  subscription: CustomSubscriptionAdapter,
  billingEvent: CustomBillingEventAdapter,
  organizationDomain: CustomOrganizationDomainAdapter,
  organizationInvite: CustomOrganizationInviteAdapter,
  organizationMembership: CustomOrganizationMembershipAdapter,
  organizationSSOProvider: CustomOrganizationSSOProviderAdapter,
};
