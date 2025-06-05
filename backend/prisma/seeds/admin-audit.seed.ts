import { prisma } from "../../auth-kit-core/src/database/prisma";

export async function seedAdminAuditLogs() {
  console.log("⏳ Seeding admin audit logs...");

  await prisma.adminAuditLog.createMany({
    data: [
      {
        actorId: "admin-1",
        action: "USER_BAN",
        target: "user-1",
        meta: {
          reason: "Violation of terms",
        },
      },
      {
        actorId: "user-1",
        action: "ACCOUNT_DELETED",
        target: "user-1",
        meta: {
          reason: "Violation of terms",
        },
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Admin audit logs seeded.");
}
