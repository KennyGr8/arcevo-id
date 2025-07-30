import { generateFakeSession } from '@utils/faker.utils';
import { insertInChunks } from '@utils/array.utils';

export default async function seedSessions(prisma, users) {
  const sessions = users.map((u) => generateFakeSession(u.id));

  await insertInChunks(sessions, 25, async (chunk) => {
    await prisma.session.createMany({ data: chunk });
  });

  return sessions;
}
