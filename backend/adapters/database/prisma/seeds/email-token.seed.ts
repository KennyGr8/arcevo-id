import { generateFakeEmailToken } from '@utils/faker.utils';
import { insertInChunks } from '@utils/array.utils';

export default async function seedEmailTokens(prisma, users) {
  const tokens = users.map((u) => generateFakeEmailToken(u.id));

  await insertInChunks(tokens, 25, async (chunk) => {
    await prisma.emailToken.createMany({ data: chunk });
  });

  return tokens;
}
