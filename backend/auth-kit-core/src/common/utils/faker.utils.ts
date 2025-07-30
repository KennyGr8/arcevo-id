import { faker } from '@faker-js/faker';

export const platforms = ['Windows', 'macOS', 'Linux', 'iOS', 'Android'] as const;
export const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'] as const;
export const deviceTypes = ['desktop', 'mobile', 'tablet'] as const;

export const roles = ['USER', 'PREMIUM', 'PRO', 'ADMIN'] as const;
export const userStatuses = ['active', 'suspended', 'banned'] as const;

export const generateFakeUser = () => ({
  email: faker.internet.email(),
  name: faker.person.fullName(),
  password: faker.internet.password(),
  role: faker.helpers.arrayElement(roles),
  status: faker.helpers.arrayElement(userStatuses),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
});

export const generateFakeSession = (userId: string) => ({
  userId,
  ip: faker.internet.ip(),
  userAgent: faker.internet.userAgent(),
  deviceName: faker.device.modelName(),
  platform: faker.helpers.arrayElement(platforms),
  browser: faker.helpers.arrayElement(browsers),
  deviceType: faker.helpers.arrayElement(deviceTypes),
  locationCity: faker.location.city(),
  locationCountry: faker.location.country(),
  refreshToken: faker.string.uuid(),
  createdAt: faker.date.recent(),
  expiresAt: faker.date.soon(7),
  firstSeenAt: faker.date.past(),
  lastUsedAt: faker.date.recent(),
  lastActiveAt: faker.date.recent(),
  valid: true,
});

export const generateFakeOrganization = () => ({
  name: faker.company.name(),
  slug: faker.helpers.slugify(faker.company.name().toLowerCase()),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
});

export const generateFakeOrganizationMembership = (userId: string, organizationId: string) => ({
  userId,
  organizationId,
  role: faker.helpers.arrayElement(['OWNER', 'ADMIN', 'MEMBER', 'GUEST']),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
});

export const generateFakeAuthLog = (userId: string) => ({
  userId,
  event: faker.helpers.arrayElement([
    'LOGIN', 'LOGOUT', 'MFA_SUCCESS', 'MFA_FAILED', 'EMAIL_VERIFIED', 'PASSWORD_CHANGED', 'TOKEN_EXPIRED',
  ]),
  ip: faker.internet.ip(),
  userAgent: faker.internet.userAgent(),
  platform: faker.helpers.arrayElement(platforms),
  browser: faker.helpers.arrayElement(browsers),
  locationCity: faker.location.city(),
  locationCountry: faker.location.country(),
  createdAt: faker.date.recent(),
});

export const generateFakeAdminAuditLog = (adminId: string) => ({
  actorId: adminId,
  action: faker.helpers.arrayElement([
    'USER_BAN', 'USER_UNBAN', 'ACCOUNT_DELETED', 'ORG_CREATED', 'ORG_MEMBER_REMOVED', 'ORG_INVITE_SENT', 'SUBSCRIPTION_UPDATED',
  ]),
  target: faker.string.uuid(),
  meta: { reason: faker.lorem.sentence() },
  createdAt: faker.date.recent(),
});

export const generateFakeActivityLog = (userId: string) => ({
  userId,
  action: faker.helpers.arrayElement(['LOGIN', 'LOGOUT', 'MFA_ENABLED', 'PASSWORD_RESET']),
  ip: faker.internet.ip(),
  userAgent: faker.internet.userAgent(),
  metadata: {
    details: faker.lorem.words(3),
  },
  createdAt: faker.date.recent(),
});

export const generateFakeBillingEvent = (userId: string, subscriptionId: string) => ({
  userId,
  subscriptionId,
  eventType: faker.helpers.arrayElement([
    'SUBSCRIPTION_CREATED', 'SUBSCRIPTION_UPDATED', 'SUBSCRIPTION_CANCELED',
    'PAYMENT_SUCCEEDED', 'PAYMENT_FAILED', 'RENEWAL',
  ]),
  provider: faker.helpers.arrayElement(['STRIPE', 'PAYSTACK', 'LEMONSQUEEZY']),
  status: faker.helpers.arrayElement(['success', 'failed']),
  metadata: {
    amount: faker.finance.amount(),
    currency: faker.finance.currencyCode(),
  },
  createdAt: faker.date.recent(),
});

export const generateFakeSubscription = (userId: string) => {
  const plans = ['FREE', 'PREMIUM', 'PRO', 'ENTERPRISE', 'EDUCATOR'];
  const statuses = ['ACTIVE', 'CANCELED', 'TRIALING', 'EXPIRED', 'RENEWED'];
  const providers = ['STRIPE', 'PAYSTACK', 'LEMONSQUEEZY'];

  const provider = faker.helpers.arrayElement(providers);

  const base = {
    userId,
    plan: faker.helpers.arrayElement(plans),
    status: faker.helpers.arrayElement(statuses),
    provider,
    currentPeriodEnd: faker.date.future(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };

  if (provider === 'STRIPE') {
    return {
      ...base,
      stripeCustomerId: faker.string.alphanumeric(10),
      stripeSubId: faker.string.alphanumeric(10),
    };
  } else if (provider === 'PAYSTACK') {
    return {
      ...base,
      paystackCustomerId: faker.string.uuid(),
      paystackSubCode: `SUB_${faker.string.alphanumeric(8)}`,
    };
  } else {
    return {
      ...base,
      lemonCustomerId: faker.string.uuid(),
      lemonOrderId: faker.string.uuid(),
    };
  }
};

export const generateFakeEmailToken = (userId: string) => ({
  email: faker.internet.email(),
  token: faker.string.uuid(),
  type: faker.helpers.arrayElement(['VERIFY_EMAIL', 'RESET_PASSWORD', 'MAGIC_LINK', 'TOTP']),
  expiresAt: faker.date.soon(),
  userId,
  createdAt: faker.date.recent(),
});

export const generateFakeOAuthAccount = (userId: string) => ({
  userId,
  provider: faker.helpers.arrayElement(['GITHUB', 'GOOGLE', 'DISCORD']),
  providerUserId: faker.string.uuid(),
  accessToken: faker.string.alphanumeric(24),
  refreshToken: faker.string.alphanumeric(24),
  expiresAt: faker.date.future(),
  createdAt: faker.date.past(),
});

export const generateFakeMFA = (userId: string) => ({
  userId,
  secret: faker.string.alphanumeric(16),
  enabled: faker.datatype.boolean(),
  verifiedAt: faker.date.recent(),
  createdAt: faker.date.past(),
});
