// backend/auth-kit-core/src/core/adapters/database/register/neon/index.ts

import type { AdapterRegistry } from "@/@types/adapter-registry";

// ✅ Import your Neon adapter implementations
import { NeonUserAdapter } from "./user.adapter";
import { NeonSessionAdapter } from "./session.adapter";
import { NeonAuthLogAdapter } from "./auth-log.adapter";
import { NeonActivityLogAdapter } from "./activity-log.adapter";
import { NeonAdminAuditLogAdapter } from "./admin-audit-log.adapter";
import { NeonOAuthAccountAdapter } from "./oauth-account.adapter";
import { NeonEmailTokenAdapter } from "./email-token.adapter";
import { NeonMFAAdapter } from "./mfa.adapter";
import { NeonMFABackupCodeAdapter } from "./mfa-backup-code.adapter";
import { NeonSubscriptionAdapter } from "./subscription.adapter";
import { NeonBillingEventAdapter } from "./billing-event.adapter";
import { NeonOrganizationDomainAdapter } from "./organization-domain.adapter";
import { NeonOrganizationInviteAdapter } from "./organization-invite.adapter";
import { NeonOrganizationMembershipAdapter } from "./organization-membership.adapter";
import { NeonOrganizationSSOProviderAdapter } from "./organization-sso-provider.adapter";

// ✅ Neon Registry Implementation
export const NeonAdapterRegistry: AdapterRegistry = {
  user: NeonUserAdapter,
  session: NeonSessionAdapter,
  authLog: NeonAuthLogAdapter,
  activityLog: NeonActivityLogAdapter,
  adminAuditLog: NeonAdminAuditLogAdapter,
  oauthAccount: NeonOAuthAccountAdapter,
  emailToken: NeonEmailTokenAdapter,
  mfa: NeonMFAAdapter,
  mfaBackupCode: NeonMFABackupCodeAdapter,
  subscription: NeonSubscriptionAdapter,
  billingEvent: NeonBillingEventAdapter,
  organizationDomain: NeonOrganizationDomainAdapter,
  organizationInvite: NeonOrganizationInviteAdapter,
  organizationMembership: NeonOrganizationMembershipAdapter,
  organizationSSOProvider: NeonOrganizationSSOProviderAdapter,
};
