import { prisma } from "./prisma";

export const getDbClient = () => prisma;

export async function shutdownDb() {
  await prisma.$disconnect();
}
