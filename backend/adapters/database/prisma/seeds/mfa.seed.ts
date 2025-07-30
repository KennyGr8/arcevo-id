import { generateFakeMFA } from '@utils/faker.utils';
import { insertInChunks } from '@utils/array.utils';

export default async function seedMFA(prisma, users) {
  const mfaEntries = users.map((u) => generateFakeMFA(u.id));

  await insertInChunks(mfaEntries, 25, async (chunk) => {
    await prisma.mFA.createMany({ data: chunk });
  });

  return mfaEntries;
}
