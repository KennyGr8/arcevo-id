import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export default async function seedBillingEvents(prisma: PrismaClient, users: { id: string }[]) {
  console.log('📘 Seeding billing events...');

  const events = await Promise.all(
    users.map((user) =>
      prisma.adminAuditLog.create({
        data: {
          userId: user.id,
          eventType: 'BILLING_EVENT',
          metadata: {
            event: faker.helpers.arrayElement(['invoice.paid', 'subscription.canceled', 'payment.failed']),
            amount: faker.finance.amount(),
            provider: faker.helpers.arrayElement(['STRIPE', 'PAYSTACK', 'LEMONSQUEEZY']),
          },
        },
      })
    )
  );

  console.log(`✅ Seeded ${events.length} billing events.`);
  return events;
}
