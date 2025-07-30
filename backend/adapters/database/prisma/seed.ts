import { prisma } from '@database/logic';
import { logger } from '@utils/logger';

// Seeder imports
import seedUsers from './seeds/user.seed';
import seedSessions from './seeds/session.seed';
import seedSubscriptions from './seeds/subscription.seed';
import seedAuthLogs from './seeds/auth-log.seed';
import seedActivityLogs from './seeds/activity-log.seed';
import seedAdminAuditLogs from './seeds/admin-audit-log.seed';
import seedBillingEvents from './seeds/billing-event.seed';
import seedOAuthAccounts from './seeds/oauth-account.seed';
import seedEmailTokens from './seeds/email-token.seed';
import seedOrganizations from './seeds/organization.seed';
import seedOrganizationMemberships from './seeds/organization-membership.seed';
import seedMFA from './seeds/mfa.seed';

const seedMap = {
  users: seedUsers,
  sessions: seedSessions,
  subscriptions: seedSubscriptions,
  authLogs: seedAuthLogs,
  activityLogs: seedActivityLogs,
  adminAuditLogs: seedAdminAuditLogs,
  billingEvents: seedBillingEvents,
  oauthAccounts: seedOAuthAccounts,
  emailTokens: seedEmailTokens,
  organizations: seedOrganizations,
  orgMemberships: seedOrganizationMemberships,
  mfa: seedMFA,
};

export async function runAllSeeds() {
  logger.info('🌱 Starting full seeding process...\n');

  const users = await seedMap.users(prisma);
  const sessions = await seedMap.sessions(prisma, users);
  const subscriptions = await seedMap.subscriptions(prisma, users);
  const authLogs = await seedMap.authLogs(prisma, users);
  const activityLogs = await seedMap.activityLogs(prisma, users);
  const adminLogs = await seedMap.adminAuditLogs(prisma, users);
  const billingEvents = await seedMap.billingEvents(prisma, subscriptions);
  const oauthAccounts = await seedMap.oauthAccounts(prisma, users);
  const emailTokens = await seedMap.emailTokens(prisma, users);
  const orgs = await seedMap.organizations(prisma);
  const memberships = await seedMap.orgMemberships(prisma, users, orgs);
  const mfas = await seedMap.mfa(prisma, users);

  logger.info('\n✅ All data seeded successfully!');
}

export async function runSelectedSeed(name: keyof typeof seedMap) {
  logger.info(`🔹 Running only: ${name}`);
  const result = await seedMap[name](prisma);
  return result;
}
