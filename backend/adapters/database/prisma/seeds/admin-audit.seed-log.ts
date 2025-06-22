import { PrismaClient } from '@prisma/client';
import { generateFakeAdminAuditLog } from '@utils/faker.utils';
import seedUsers from './user.seed';

export default async function seedAdminAuditLogs(prisma: PrismaClient) {
  console.log('🛡️  Seeding admin audit logs...');

  const users = await seedUsers(prisma);
  const admins = users.filter((u) => u.role === 'ADMIN');

  const logs = admins.flatMap((admin) =>
    Array.from({ length: 2 }).map(() => generateFakeAdminAuditLog(admin.id))
  );

  const createdLogs = await Promise.all(
    logs.map((log) => prisma.adminAuditLog.create({ data: log }))
  );

  console.log(`✅ Seeded ${createdLogs.length} admin audit logs`);
}
