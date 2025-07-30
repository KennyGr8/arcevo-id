import { generateFakeAuthLog } from '@utils/faker.utils';
import { insertInChunks } from '@utils/array.utils';

export default async function seedAuthLogs(prisma, users) {
  const logs = users.map((u) => generateFakeAuthLog(u.id));

  await insertInChunks(logs, 25, async (chunk) => {
    await prisma.authLog.createMany({ data: chunk });
  });

  return logs;
}
