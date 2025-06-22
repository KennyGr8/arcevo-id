// backend/auth-kit-core/src/core/adapters/database/register/prisma/index.ts

import type { AdapterRegistry } from "@/@types/adapter-registry";

// ✅ Import your Prisma adapter implementations
import { PrismaUserAdapter } from "./user.adapter";
import { PrismaSessionAdapter } from "./session.adapter";
import { PrismaAuthLogAdapter } from "./auth-log.adapter";
import { PrismaActivityLogAdapter } from "./activity-log.adapter";
import { PrismaAdminAuditLogAdapter } from "./admin-audit-log.adapter";
import { PrismaOAuthAccountAdapter } from "./oauth-account.adapter";
import { PrismaEmailTokenAdapter } from "./email-token.adapter";
import { PrismaMFAAdapter } from "./mfa.adapter";
import { PrismaMFABackupCodeAdapter } from "./mfa-backup-code.adapter";
import { PrismaSubscriptionAdapter } from "./subscription.adapter";
import { PrismaBillingEventAdapter } from "./billing-event.adapter";
import { PrismaOrganizationDomainAdapter } from "./organization-domain.adapter";
import { PrismaOrganizationAdapter } from "./organization.adapter";
import { PrismaOrganizationInviteAdapter } from "./organization-invite.adapter";
import { PrismaOrganizationMembershipAdapter } from "./organization-membership.adapter";
import { PrismaOrganizationSSOProviderAdapter } from "./organization-sso-provider.adapter";

// ✅ Prisma Registry Implementation
export const PrismaAdapterRegistry: AdapterRegistry = {
  user: PrismaUserAdapter,
  session: PrismaSessionAdapter,
  authLog: PrismaAuthLogAdapter,
  activityLog: PrismaActivityLogAdapter,
  adminAuditLog: PrismaAdminAuditLogAdapter,
  oauthAccount: PrismaOAuthAccountAdapter,
  emailToken: PrismaEmailTokenAdapter,
  mfa: PrismaMFAAdapter,
  mfaBackupCode: PrismaMFABackupCodeAdapter,
  subscription: PrismaSubscriptionAdapter,
  billingEvent: PrismaBillingEventAdapter,
  organization: PrismaOrganizationAdapter,
  organizationDomain: PrismaOrganizationDomainAdapter,
  organizationInvite: PrismaOrganizationInviteAdapter,
  organizationMembership: PrismaOrganizationMembershipAdapter,
  organizationSSOProvider: PrismaOrganizationSSOProviderAdapter,
};
