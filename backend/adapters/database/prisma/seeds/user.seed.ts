import { PrismaClient } from '@prisma/client';
import { generateFakeUser } from '@utils/faker.utils';

export default async function seedUsers(prisma: PrismaClient) {
  console.log('👤 Seeding users...');

  const users = Array.from({ length: 5 }).map(() => generateFakeUser());

  const createdUsers = await Promise.all(
    users.map((data) => prisma.user.create({ data }))
  );

  console.log(`✅ Seeded ${createdUsers.length} users`);
  return createdUsers;
}
