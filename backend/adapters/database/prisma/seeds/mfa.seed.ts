import { prisma } from "../../auth-kit-core/src/database/prisma";

export default async function seedMFA() {
  console.log("⏳ Seeding MFA...");

  // Create MFA entries
  await prisma.mFA.createMany({
    data: [
      {
        userId: "user-1",
        secret: "SAMPLESECRET",
        enabled: true,
        verifiedAt: new Date(),
      },
      {
        userId: "premium-1",
        secret: "SAMPLESECRET",
        enabled: true,
        verifiedAt: new Date(),
      },
    ],
    skipDuplicates: true,
  });

  // Get MFA IDs (we need to look them up because createMany doesn't return them)
  const userMFA = await prisma.mFA.findUnique({ where: { userId: "user-1" } });
  const premiumMFA = await prisma.mFA.findUnique({ where: { userId: "premium-1" } });

  if (!userMFA || !premiumMFA) {
    throw new Error("MFA records not found after insert.");
  }

  // Insert backup codes
  await prisma.mFA_BackupCode.createMany({
    data: [
      { code: "backup-code-1", mfaId: userMFA.id },
      { code: "backup-code-2", mfaId: userMFA.id },
      { code: "backup-code-3", mfaId: premiumMFA.id },
      { code: "backup-code-4", mfaId: premiumMFA.id },
    ],
    skipDuplicates: true,
  });

  console.log("✅ MFA seeded.");
}
