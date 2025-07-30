import { generateFakeOrganizationMembership } from '@utils/faker.utils';
import { insertInChunks } from '@utils/array.utils';

export default async function seedOrganizationMemberships(prisma, users, orgs) {
  const memberships = users.map((u, i) => {
    const org = orgs[i % orgs.length];
    return generateFakeOrganizationMembership(u.id, org.id);
  });

  await insertInChunks(memberships, 25, async (chunk) => {
    await prisma.organizationMembership.createMany({ data: chunk });
  });

  return memberships;
}
