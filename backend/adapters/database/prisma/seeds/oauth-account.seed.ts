import { generateFakeOAuthAccount } from '@utils/faker.utils';
import { insertInChunks } from '@utils/array.utils';

export default async function seedOAuthAccounts(prisma, users) {
  const accounts = users.map((u) => generateFakeOAuthAccount(u.id));

  await insertInChunks(accounts, 25, async (chunk) => {
    await prisma.oAuthAccount.createMany({ data: chunk });
  });

  return accounts;
}
