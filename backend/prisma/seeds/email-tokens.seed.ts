import { prisma } from "../../auth-kit-core/src/database/prisma";

export default async function seedEmailTokens() {
  console.log("⏳ Seeding email tokens...");

  await prisma.emailToken.createMany({
    data: [
      {
        id: "token-1",
        email: "user1@example.com",
        token: "verify-token-123",
        type: "VERIFY_EMAIL",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
        userId: "user-1",
      },
      {
        id: "token-2",
        email: "user1@example.com",
        token: "reset-token-456",
        type: "RESET_PASSWORD",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
        userId: "user-1",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Email tokens seeded.");
}
