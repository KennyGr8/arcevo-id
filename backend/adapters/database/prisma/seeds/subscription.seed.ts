import { generateFakeSubscription } from '@utils/faker.utils';
import { insertInChunks } from '@utils/array.utils';

export default async function seedSubscriptions(prisma, users) {
  const subscriptions = users.map((u) => generateFakeSubscription(u.id));

  await insertInChunks(subscriptions, 25, async (chunk) => {
    await prisma.subscription.createMany({ data: chunk });
  });

  return await prisma.subscription.findMany();
}
