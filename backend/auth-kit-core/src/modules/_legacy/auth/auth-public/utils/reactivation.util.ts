import { generateVerificationToken } from "../../../common/utils/uuid";
import { Mailer } from "../../../mailers/mailer";
import { prisma } from "../../../database";

export async function sendReactivationEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.isDeactivated || user.deletedAt === null) return;

  const token = generateVerificationToken();
  await Mailer.sendAccountReactivationEmail(user.email, token);
}
