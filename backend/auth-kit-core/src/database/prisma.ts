// auth-kit-core/src/database/prisma.ts

import { PrismaClient, User, Session, MFA, MFA_BackupCode, AuthLog, ActivityLog, AdminAuditLog, OAuthAccount, EmailToken, Subscription, BillingEvent, Organization, OrganizationDomain, OrganizationInvite, OrganizationMembership, OrganizationSSOProvider } from "@generated/prisma";
import { config } from "@database/config";

declare global {
  // Prevent multiple instances of Prisma Client in development
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma ?? new PrismaClient();

if (config.NODE_ENV !== "production") global.prisma = prisma;

export type UserModel = User;
export type SessionModel = Session;
export type MFAModel = MFA;
export type MFABackupCodeModel = MFA_BackupCode;
export type AuthLogModel = AuthLog;
export type ActivityLogModel = ActivityLog;
export type AdminAuditLogModel = AdminAuditLog;
export type OAuthAccountModel = OAuthAccount;
export type EmailTokenModel = EmailToken;
export type SubscriptionModel = Subscription;
export type BillingEventModel = BillingEvent;
export type OrganizationModel = Organization;
export type OrganizationDomainModel = OrganizationDomain;
export type OrganizationInviteModel = OrganizationInvite;
export type OrganizationMembershipModel = OrganizationMembership;
export type OrganizationSSOProviderModel = OrganizationSSOProvider;
