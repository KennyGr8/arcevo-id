import { PrismaClient } from '@prisma/client';
import { generateFakeAuthLog } from '@utils/faker.utils';
import seedSessions from './session.seed';

export default async function seedAuthLogs(prisma: PrismaClient) {
  console.log('📜 Seeding auth logs...');

  const { users } = await seedSessions(prisma);

  const logs = users.flatMap((user) =>
    Array.from({ length: 2 }).map(() => generateFakeAuthLog(user.id))
  );

  const createdLogs = await Promise.all(
    logs.map((log) => prisma.authLog.create({ data: log }))
  );

  console.log(`✅ Seeded ${createdLogs.length} auth logs`);
}
