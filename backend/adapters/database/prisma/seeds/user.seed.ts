import { generateFakeUser } from '@utils/faker.utils';
import { insertInChunks } from '@utils/array.utils';

export default async function seedUsers(prisma) {
  const usersData = Array.from({ length: 100 }, () => generateFakeUser());

  await insertInChunks(usersData, 25, async (chunk) => {
    await prisma.user.createMany({ data: chunk });
  });

  return await prisma.user.findMany();
}
