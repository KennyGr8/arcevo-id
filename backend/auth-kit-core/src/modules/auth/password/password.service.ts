import { hashValue } from "../../../common/utils/bcrypt";
import { generateVerificationToken } from "../../../common/utils/uuid";
import { verifyJwtToken } from "../../../common/utils/jwt";
import { AppError } from "../../../common/utils/AppError";
import { HTTPSTATUS } from "../../../database/config/http.config";
import { prisma } from "../../../database";
import { ForgotPasswordDto } from "./password.dto";
import { Mailer } from "../../../mailers/mailer";

export class PasswordService {
  static async sendResetPasswordEmail(data: ForgotPasswordDto) {
    const { email } = data;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.isDeactivated || user.status !== "active") return;

    const token = generateVerificationToken(); // UUID token or use JWT with short expiry
    await Mailer.sendPasswordResetEmail(user.email, token);
  }

  static async resetPassword(token: string, password: string) {
    const result = verifyJwtToken(token);

    if ("error" in result || !result.payload?.userId) {
      throw new AppError("Invalid or expired reset token", HTTPSTATUS.UNAUTHORIZED);
    }

    const userId = result.payload.userId;

    const hashed = await hashValue(password);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });
  }
}
