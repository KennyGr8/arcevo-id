// backend/auth-kit-core/src/core/adapters/database/register/convex/index.ts

import type { AdapterRegistry } from "@/@types/adapter-registry";

// ✅ Import your Convex adapter implementations
import { ConvexUserAdapter } from "./user.adapter";
import { ConvexSessionAdapter } from "./session.adapter";
import { ConvexAuthLogAdapter } from "./auth-log.adapter";
import { ConvexActivityLogAdapter } from "./activity-log.adapter";
import { ConvexAdminAuditLogAdapter } from "./admin-audit-log.adapter";
import { ConvexOAuthAccountAdapter } from "./oauth-account.adapter";
import { ConvexEmailTokenAdapter } from "./email-token.adapter";
import { ConvexMFAAdapter } from "./mfa.adapter";
import { ConvexMFABackupCodeAdapter } from "./mfa-backup-code.adapter";
import { ConvexSubscriptionAdapter } from "./subscription.adapter";
import { ConvexBillingEventAdapter } from "./billing-event.adapter";
import { ConvexOrganizationDomainAdapter } from "./organization-domain.adapter";
import { ConvexOrganizationInviteAdapter } from "./organization-invite.adapter";
import { ConvexOrganizationMembershipAdapter } from "./organization-membership.adapter";
import { ConvexOrganizationSSOProviderAdapter } from "./organization-sso-provider.adapter";

// ✅ Convex Registry Implementation
export const ConvexAdapterRegistry: AdapterRegistry = {
  user: ConvexUserAdapter,
  session: ConvexSessionAdapter,
  authLog: ConvexAuthLogAdapter,
  activityLog: ConvexActivityLogAdapter,
  adminAuditLog: ConvexAdminAuditLogAdapter,
  oauthAccount: ConvexOAuthAccountAdapter,
  emailToken: ConvexEmailTokenAdapter,
  mfa: ConvexMFAAdapter,
  mfaBackupCode: ConvexMFABackupCodeAdapter,
  subscription: ConvexSubscriptionAdapter,
  billingEvent: ConvexBillingEventAdapter,
  organizationDomain: ConvexOrganizationDomainAdapter,
  organizationInvite: ConvexOrganizationInviteAdapter,
  organizationMembership: ConvexOrganizationMembershipAdapter,
  organizationSSOProvider: ConvexOrganizationSSOProviderAdapter,
};
