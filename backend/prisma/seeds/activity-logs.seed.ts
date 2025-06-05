import { prisma } from "../../auth-kit-core/src/database/prisma";

export default async function seedActivityLogs() {
  console.log("⏳ Seeding activity logs...");

  await prisma.activityLog.createMany({
    data: [
      {
        userId: "user-1",
        action: "LOGIN",
        ip: "127.0.0.1",
        userAgent: "Seed Agent",
      },
      {
        userId: "user-1",
        action: "MFA_ENABLED",
        ip: "127.0.0.1",
        userAgent: "Seed Agent",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Activity logs seeded.");
}
