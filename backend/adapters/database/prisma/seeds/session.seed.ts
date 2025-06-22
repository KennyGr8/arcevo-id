import { PrismaClient } from '@prisma/client';
import { generateFakeSession } from '@utils/faker.utils';
import seedUsers from './user.seed';

export default async function seedSessions(prisma: PrismaClient) {
  console.log('💻 Seeding sessions...');

  const users = await seedUsers(prisma);

  const sessions = users.flatMap((user) =>
    Array.from({ length: 3 }).map(() => generateFakeSession(user.id))
  );

  const createdSessions = await Promise.all(
    sessions.map((session) => prisma.session.create({ data: session }))
  );

  console.log(`✅ Seeded ${createdSessions.length} sessions`);
  return { users, sessions: createdSessions };
}
