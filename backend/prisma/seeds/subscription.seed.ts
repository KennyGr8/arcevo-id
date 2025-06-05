import { PrismaClient, SubscriptionPlan, SubscriptionStatus, SubscriptionProvider } from '@generated/prisma';
import { faker } from '@faker-js/faker';

export default async function seedSubscriptions(prisma: PrismaClient, users: { id: string }[]) {
  console.log('💳 Seeding subscriptions...');

  const subscriptionPlans = [
    SubscriptionPlan.FREE,
    SubscriptionPlan.PREMIUM,
    SubscriptionPlan.PRO,
    SubscriptionPlan.ENTERPRISE,
    SubscriptionPlan.EDUCATOR,
  ];

  const providers = [
    SubscriptionProvider.STRIPE,
    SubscriptionProvider.PAYSTACK,
    SubscriptionProvider.LEMONSQUEEZY,
  ];

  const statusPool = [
    SubscriptionStatus.ACTIVE,
    SubscriptionStatus.TRIALING,
    SubscriptionStatus.RENEWED,
    SubscriptionStatus.CANCELED,
    SubscriptionStatus.EXPIRED,
  ];

  const now = new Date();

  const subscriptions = await Promise.all(
    users.map((user) => {
      const plan = faker.helpers.arrayElement(subscriptionPlans);
      const status = faker.helpers.arrayElement(statusPool);
      const provider = faker.helpers.arrayElement(providers);

      const baseData = {
        userId: user.id,
        plan,
        status,
        provider,
        currentPeriodEnd: faker.date.future(),
        createdAt: now,
        updatedAt: now,
      };

      const providerSpecificFields =
        provider === SubscriptionProvider.STRIPE
          ? {
              stripeCustomerId: `cus_${faker.string.alphanumeric(12)}`,
              stripeSubId: `sub_${faker.string.alphanumeric(12)}`,
            }
          : provider === SubscriptionProvider.PAYSTACK
          ? {
              paystackCustomerId: faker.string.uuid(),
              paystackSubCode: `SUB_${faker.string.alphanumeric(10)}`,
            }
          : {
              lemonCustomerId: faker.string.uuid(),
              lemonOrderId: faker.string.uuid(),
            };

      return prisma.subscription.create({
        data: {
          ...baseData,
          ...providerSpecificFields,
        },
      });
    })
  );

  console.log(`✅ Seeded ${subscriptions.length} subscriptions.`);
  return subscriptions;
}
