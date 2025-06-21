// backend/auth-kit-core/src/core/adapters/database/register/supabase/index.ts

import type { AdapterRegistry } from "@/@types/adapter-registry";

// ✅ Import your Supabase adapter implementations
import { SupabaseUserAdapter } from "./user.adapter";
import { SupabaseSessionAdapter } from "./session.adapter";
import { SupabaseAuthLogAdapter } from "./auth-log.adapter";
import { SupabaseActivityLogAdapter } from "./activity-log.adapter";
import { SupabaseAdminAuditLogAdapter } from "./admin-audit-log.adapter";
import { SupabaseOAuthAccountAdapter } from "./oauth-account.adapter";
import { SupabaseEmailTokenAdapter } from "./email-token.adapter";
import { SupabaseMFAAdapter } from "./mfa.adapter";
import { SupabaseMFABackupCodeAdapter } from "./mfa-backup-code.adapter";
import { SupabaseSubscriptionAdapter } from "./subscription.adapter";
import { SupabaseBillingEventAdapter } from "./billing-event.adapter";
import { SupabaseOrganizationDomainAdapter } from "./organization-domain.adapter";
import { SupabaseOrganizationInviteAdapter } from "./organization-invite.adapter";
import { SupabaseOrganizationMembershipAdapter } from "./organization-membership.adapter";
import { SupabaseOrganizationSSOProviderAdapter } from "./organization-sso-provider.adapter";

// ✅ Supabase Registry Implementation
export const SupabaseAdapterRegistry: AdapterRegistry = {
  user: SupabaseUserAdapter,
  session: SupabaseSessionAdapter,
  authLog: SupabaseAuthLogAdapter,
  activityLog: SupabaseActivityLogAdapter,
  adminAuditLog: SupabaseAdminAuditLogAdapter,
  oauthAccount: SupabaseOAuthAccountAdapter,
  emailToken: SupabaseEmailTokenAdapter,
  mfa: SupabaseMFAAdapter,
  mfaBackupCode: SupabaseMFABackupCodeAdapter,
  subscription: SupabaseSubscriptionAdapter,
  billingEvent: SupabaseBillingEventAdapter,
  organizationDomain: SupabaseOrganizationDomainAdapter,
  organizationInvite: SupabaseOrganizationInviteAdapter,
  organizationMembership: SupabaseOrganizationMembershipAdapter,
  organizationSSOProvider: SupabaseOrganizationSSOProviderAdapter,
};
