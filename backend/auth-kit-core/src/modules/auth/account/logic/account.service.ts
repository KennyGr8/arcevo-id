import { prisma } from "../../../../common/database/prisma";
import { NotFoundException } from "../../../../common/utils/catch-error";
import { AppError } from "../../../../common/utils/app-error";
import { HTTPSTATUS } from "../../../../common/configs/http.config";
import { hashPassword, comparePasswords } from "../../../../common/utils/bcrypt";
import { invalidateAllSessions } from "../../../session/utils/invalidate-session";
import { logAuthEvent } from "../../../../common/utils/log-auth-event";

export class AccountService {
  async deactivateAccount(userId: string) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
    });

    if (!user) throw new NotFoundException("User not found");

    await invalidateAllSessions(userId);
    await logAuthEvent(userId, "account_deactivated");
  }

  async deleteAccount(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException("User not found");

    await prisma.$transaction([
      prisma.session.deleteMany({ where: { userId } }),
      prisma.authLog.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);

    await logAuthEvent(userId, "account_deleted");
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException("User not found");

    const isMatch = await comparePasswords(currentPassword, user.password);
    if (!isMatch) throw new AppError("Incorrect current password", HTTPSTATUS.UNAUTHORIZED);

    const hashed = await hashPassword(newPassword);
    await prisma.user.update({ where: { id: userId }, data: { password: hashed } });

    await logAuthEvent(userId, "password_changed");
  }
}
