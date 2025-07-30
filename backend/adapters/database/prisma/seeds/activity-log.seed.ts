import { generateFakeActivityLog } from '@utils/faker.utils';
import { insertInChunks } from '@utils/array.utils';

export default async function seedActivityLogs(prisma, users) {
  const logs = users.map((u) => generateFakeActivityLog(u.id));

  await insertInChunks(logs, 25, async (chunk) => {
    await prisma.activityLog.createMany({ data: chunk });
  });

  return logs;
}
