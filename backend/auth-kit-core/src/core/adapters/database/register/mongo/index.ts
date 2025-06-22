// backend/auth-kit-core/src/core/adapters/database/register/mongo/index.ts

import type { AdapterRegistry } from "@/@types/adapter-registry";

// ✅ Import your Mongo adapter implementations
import { MongoUserAdapter } from "./user.adapter";
import { MongoSessionAdapter } from "./session.adapter";
import { MongoAuthLogAdapter } from "./auth-log.adapter";
import { MongoActivityLogAdapter } from "./activity-log.adapter";
import { MongoAdminAuditLogAdapter } from "./admin-audit-log.adapter";
import { MongoOAuthAccountAdapter } from "./oauth-account.adapter";
import { MongoEmailTokenAdapter } from "./email-token.adapter";
import { MongoMFAAdapter } from "./mfa.adapter";
import { MongoMFABackupCodeAdapter } from "./mfa-backup-code.adapter";
import { MongoSubscriptionAdapter } from "./subscription.adapter";
import { MongoBillingEventAdapter } from "./billing-event.adapter";
import { MongoOrganizationDomainAdapter } from "./organization-domain.adapter";
import { MongoOrganizationAdapter } from "./organization.adapter";
import { MongoOrganizationInviteAdapter } from "./organization-invite.adapter";
import { MongoOrganizationMembershipAdapter } from "./organization-membership.adapter";
import { MongoOrganizationSSOProviderAdapter } from "./organization-sso-provider.adapter";

// ✅ Mongo Registry Implementation
export const MongoAdapterRegistry: AdapterRegistry = {
  user: MongoUserAdapter,
  session: MongoSessionAdapter,
  authLog: MongoAuthLogAdapter,
  activityLog: MongoActivityLogAdapter,
  adminAuditLog: MongoAdminAuditLogAdapter,
  oauthAccount: MongoOAuthAccountAdapter,
  emailToken: MongoEmailTokenAdapter,
  mfa: MongoMFAAdapter,
  mfaBackupCode: MongoMFABackupCodeAdapter,
  subscription: MongoSubscriptionAdapter,
  billingEvent: MongoBillingEventAdapter,
  organizationDomain: MongoOrganizationDomainAdapter,
  organizationInvite: MongoOrganizationInviteAdapter,
  organizationMembership: MongoOrganizationMembershipAdapter,
  organizationSSOProvider: MongoOrganizationSSOProviderAdapter,
};
