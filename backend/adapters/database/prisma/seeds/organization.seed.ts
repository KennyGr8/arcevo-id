import { generateFakeOrganization } from '@utils/faker.utils';
import { insertInChunks } from '@utils/array.utils';

export default async function seedOrganizations(prisma) {
  const orgsData = Array.from({ length: 5 }, generateFakeOrganization);

  await insertInChunks(orgsData, 5, async (chunk) => {
    await prisma.organization.createMany({ data: chunk });
  });

  const orgs = await prisma.organization.findMany();
  return orgs;
}
