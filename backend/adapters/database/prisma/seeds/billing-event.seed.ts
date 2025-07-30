import { generateFakeBillingEvent } from '@utils/faker.utils';
import { insertInChunks } from '@utils/array.utils';

export default async function seedBillingEvents(prisma, subscriptions) {
  const events = subscriptions.map((s) => generateFakeBillingEvent(s.userId, s.id));

  await insertInChunks(events, 25, async (chunk) => {
    await prisma.billingEvent.createMany({ data: chunk });
  });

  return events;
}
