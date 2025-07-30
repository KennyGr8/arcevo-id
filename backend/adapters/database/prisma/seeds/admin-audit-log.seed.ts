import { generateFakeAdminAuditLog } from '@utils/faker.utils';
import { insertInChunks } from '@utils/array.utils';

export default async function seedAdminAuditLogs(prisma, users) {
  const admins = users.filter((u) => u.role === 'ADMIN');
  const logs = admins.map((a) => generateFakeAdminAuditLog(a.id));

  await insertInChunks(logs, 25, async (chunk) => {
    await prisma.adminAuditLog.createMany({ data: chunk });
  });

  return logs;
}
