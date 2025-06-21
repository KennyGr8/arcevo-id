// backend/auth-kit-core/src/core/adapters/database/register/firebase/index.ts

import type { AdapterRegistry } from "@/@types/adapter-registry";

// ✅ Import your Firebase adapter implementations
import { FirebaseUserAdapter } from "./user.adapter";
import { FirebaseSessionAdapter } from "./session.adapter";
import { FirebaseAuthLogAdapter } from "./auth-log.adapter";
import { FirebaseActivityLogAdapter } from "./activity-log.adapter";
import { FirebaseAdminAuditLogAdapter } from "./admin-audit-log.adapter";
import { FirebaseOAuthAccountAdapter } from "./oauth-account.adapter";
import { FirebaseEmailTokenAdapter } from "./email-token.adapter";
import { FirebaseMFAAdapter } from "./mfa.adapter";
import { FirebaseMFABackupCodeAdapter } from "./mfa-backup-code.adapter";
import { FirebaseSubscriptionAdapter } from "./subscription.adapter";
import { FirebaseBillingEventAdapter } from "./billing-event.adapter";
import { FirebaseOrganizationDomainAdapter } from "./organization-domain.adapter";
import { FirebaseOrganizationInviteAdapter } from "./organization-invite.adapter";
import { FirebaseOrganizationMembershipAdapter } from "./organization-membership.adapter";
import { FirebaseOrganizationSSOProviderAdapter } from "./organization-sso-provider.adapter";

// ✅ Firebase Registry Implementation
export const FirebaseAdapterRegistry: AdapterRegistry = {
  user: FirebaseUserAdapter,
  session: FirebaseSessionAdapter,
  authLog: FirebaseAuthLogAdapter,
  activityLog: FirebaseActivityLogAdapter,
  adminAuditLog: FirebaseAdminAuditLogAdapter,
  oauthAccount: FirebaseOAuthAccountAdapter,
  emailToken: FirebaseEmailTokenAdapter,
  mfa: FirebaseMFAAdapter,
  mfaBackupCode: FirebaseMFABackupCodeAdapter,
  subscription: FirebaseSubscriptionAdapter,
  billingEvent: FirebaseBillingEventAdapter,
  organizationDomain: FirebaseOrganizationDomainAdapter,
  organizationInvite: FirebaseOrganizationInviteAdapter,
  organizationMembership: FirebaseOrganizationMembershipAdapter,
  organizationSSOProvider: FirebaseOrganizationSSOProviderAdapter,
};
