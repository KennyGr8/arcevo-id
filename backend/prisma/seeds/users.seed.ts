import { prisma } from "../../auth-kit-core/src/database/prisma";
import bcrypt from "bcryptjs";

export async function seedUsers() {
  console.log("⏳ Seeding users...");

  const password = "password123";
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.createMany({
    data: [
      {
        id: "user-1",
        email: "user1@example.com",
        password: hashedPassword,
        name: "User One",
      },
      {
        id: "admin-1",
        email: "admin@example.com",
        password: hashedPassword,
        name: "Admin User",
        role: "ADMIN",
      },
      {
        id: "premium-1",
        email: "premium1@example.com",
        password: hashedPassword,
        name: "Premium Ome",
        role: "PREMIUM",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Users seeded.");
}
