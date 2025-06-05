import { faker } from '@faker-js/faker';

// Reuse common enums
const platforms = ['Windows', 'macOS', 'Linux', 'iOS', 'Android'] as const;
const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'] as const;
const deviceTypes = ['desktop', 'mobile', 'tablet'] as const;
const roles = ['USER', 'ADMIN'] as const;

export const generateFakeUser = () => ({
  email: faker.internet.email(),
  name: faker.person.fullName(),
  password: faker.internet.password(),
  avatarUrl: faker.image.avatar(),
  role: faker.helpers.arrayElement(roles),
});

export const generateFakeSession = (userId: string) => ({
  userId,
  ip: faker.internet.ip(),
  userAgent: faker.internet.userAgent(),
  platform: faker.helpers.arrayElement(platforms),
  browser: faker.helpers.arrayElement(browsers),
  deviceName: faker.device.modelName(),
  deviceType: faker.helpers.arrayElement(deviceTypes),
  location: faker.location.city() + ', ' + faker.location.country(),
  refreshToken: faker.string.uuid(),
  createdAt: faker.date.recent(),
  expiresAt: faker.date.soon(7),
  firstSeenAt: faker.date.recent(),
  lastUsedAt: faker.date.recent(),
  lastActiveAt: faker.date.recent(),
});

export const generateFakeOrganization = () => ({
  name: faker.company.name(),
  domain: faker.internet.domainName(),
  createdAt: faker.date.past(),
});

export const generateFakeAuthLog = (userId: string) => ({
  userId,
  eventType: faker.helpers.arrayElement(['LOGIN', 'LOGOUT', 'MFA_CHALLENGE']),
  ip: faker.internet.ip(),
  userAgent: faker.internet.userAgent(),
  timestamp: faker.date.recent(),
});

export const generateFakeAdminAuditLog = (adminId: string) => ({
  adminId,
  action: faker.helpers.arrayElement(['USER_BANNED', 'SUBSCRIPTION_UPDATED']),
  target: faker.string.uuid(),
  metadata: JSON.stringify({ reason: faker.lorem.sentence() }),
  createdAt: faker.date.recent(),
});

export const generateFakeSubscription = (userId: string) => ({
  userId,
  plan: faker.helpers.arrayElement(['FREE', 'PRO', 'ENTERPRISE']),
  status: faker.helpers.arrayElement(['ACTIVE', 'PAST_DUE', 'CANCELLED']),
  startedAt: faker.date.past(),
  endsAt: faker.date.future(),
});
