import type { Request } from "express";
import { LoginDto, ReactivateDto, RegisterDto } from "../validator/auth.dto";
import { prisma } from "@/database/prisma";
import { compareValue, hashValue } from "@/common/utils/bcrypt";
import {
  signJwtToken,
  accessTokenSignOptions,
  refreshTokenSignOptions,
  verifyJwtToken,
} from "@/common/utils/jwt";
import { createSession } from "../../../session/session.service";
import { AppError } from "@/common/utils/AppError";
import { logger } from "@/common/utils/logger";
import { config } from "@/database/config/app.config";
import { logAuthEvent } from "@/common/utils/log-auth-event";
import { logActivity } from "@/common/utils/log-activity";
import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";
import { HTTPSTATUS } from "@/database/config/http.config";
import { Mailer } from "@/mailers/mailer";
import { generateVerificationToken } from "@/common/utils/uuid";

export class AuthService {
  private async extractRequestMetadata()

  private async signAuthTokens(userId: string, sessionId: string) {
    const accessToken = signJwtToken(
      { userId, sessionId },
      accessTokenSignOptions
    );

    const refreshToken = signJwtToken(
      { sessionId },
      refreshTokenSignOptions
    );

    return { accessToken, refreshToken };
  }

  async registerUser(data: RegisterDto, req: Request) {
    const { name, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      throw new AppError("Passwords do not match", HTTPSTATUS.BAD_REQUEST);
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new AppError("User with this email already exists", HTTPSTATUS.BAD_REQUEST);
    }

    const hashedPassword = await hashValue(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerified: null,
      },
    });

    const verificationLink = `${config.APP_ORIGIN}/verify/email?user=${newUser.id}`;
    await Mailer.sendVerificationEmail(newUser.email, verificationLink);

    const { ip, userAgent, deviceInfo, location } = this.extractRequestMetadata(req);
    const session = await createSession(newUser.id, {
      ip,
      userAgent,
      deviceInfo,
      location,
      fingerprint: (req.headers["x-device-fingerprint"] as string) || undefined,
    });

    await logAuthEvent({ userId: newUser.id, event: "register", ip, userAgent });
    await logActivity(newUser.id, "session_created", { ip, userAgent });

    const tokens = await this.signAuthTokens(newUser.id, session.id);

    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      tokens,
    };
  }

  async loginUser(data: LoginDto, req: Request) {
    const { email, password } = data;
    const user = await prisma.user.findUnique({ where: { email } });
    const invalidCredentials = new AppError("Invalid email or password", HTTPSTATUS.UNAUTHORIZED);

    if (!user || !user.password) {
      logger.warn(`Login failed: No valid user or password for ${email}`);
      throw invalidCredentials;
    }

    if (user.deletedAt || user.isDeactivated) {
      throw new AppError("Account has been deactivated or deleted", 403);
    }

    if (user.status === "suspended") {
      throw new AppError("Account is suspended. Contact support.", 403);
    }

    if (!user.emailVerified) {
      throw new AppError("Please verify your email before logging in", 403);
    }

    const isPasswordValid = await compareValue(password, user.password);
    if (!isPasswordValid) {
      logger.warn(`Login failed: Incorrect password for ${email}`);
      throw invalidCredentials;
    }

    const { ip, userAgent, deviceInfo, location } = this.extractRequestMetadata(req);
    const session = await createSession(user.id, {
      ip,
      userAgent,
      deviceInfo,
      location,
      fingerprint: (req.headers["x-device-fingerprint"] as string) || undefined,
    });

    await logAuthEvent({ userId: user.id, event: "login", ip, userAgent });
    await logActivity(user.id, "session_created", { ip, userAgent });

    const tokens = await this.signAuthTokens(user.id, session.id);

    logger.info(`Login successful for user: ${email}`);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      tokens,
    };
  }

  async logoutUser(sessionId: string) {
    const session = await prisma.session.findUnique({ where: { id: sessionId } });

    if (!session) {
      throw new AppError("Session not found", 404);
    }

    if (!session.valid) return;

    await prisma.session.update({
      where: { id: sessionId },
      data: { valid: false },
    });

    await logAuthEvent({
      userId: session.userId,
      event: "logout",
      ip: "",
      userAgent: "",
    });

    logger.info(`Session invalidated: ${sessionId}`);
  }

  async refreshToken(oldRefreshToken: string, req: Request) {
    if (!oldRefreshToken) {
      throw new AppError("Refresh token missing", HTTPSTATUS.BAD_REQUEST);
    }

    let decoded: any;
    try {
      decoded = verifyJwtToken(oldRefreshToken, refreshTokenSignOptions);
    } catch {
      throw new AppError("Invalid refresh token", HTTPSTATUS.UNAUTHORIZED);
    }

    const sessionId = decoded.sessionId;
    if (!sessionId) {
      throw new AppError("Invalid token payload", HTTPSTATUS.UNAUTHORIZED);
    }

    const session = await prisma.session.findUnique({ where: { id: sessionId } });
    if (!session || !session.valid) {
      throw new AppError("Session not valid or expired", HTTPSTATUS.UNAUTHORIZED);
    }

    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    if (!user) {
      throw new AppError("User not found", HTTPSTATUS.NOT_FOUND);
    }

    const { ip, userAgent } = this.extractRequestMetadata(req);

    await prisma.session.update({
      where: { id: sessionId },
      data: { lastActiveAt: new Date() },
    });

    await logAuthEvent({
      userId: user.id,
      event: "refresh_token",
      ip,
      userAgent,
    });

    const tokens = await this.signAuthTokens(user.id, session.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      tokens,
    };
  }

  async reactivateWithCredentials(data: ReactivateDto, req: Request) {
    const { email, password } = data;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.deletedAt === null || !user.isDeactivated) {
      throw new AppError("Account not deactivated or not found", HTTPSTATUS.BAD_REQUEST);
    }

    if (!user.password) {
      throw new AppError("Invalid credentials", HTTPSTATUS.UNAUTHORIZED);
    }

    const isValid = await compareValue(password, user.password);
    if (!isValid) throw new AppError("Invalid credentials", HTTPSTATUS.UNAUTHORIZED);

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { isDeactivated: false, deletedAt: null },
    });

    await logAuthEvent({
      userId: user.id,
      event: "account_reactivated",
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    await createSession(user.id, {
      ip: req.ip,
      userAgent: req.headers["user-agent"] as string,
    });

    return updated;
  }

  async reactivateWithToken(token: string, req: Request) {
    const result = verifyJwtToken(token);
    if (!result || !("payload" in result) || !result.payload || !("sub" in result.payload)) {
      throw new AppError("Invalid token", HTTPSTATUS.BAD_REQUEST);
    }

    const userId = typeof result.payload.sub === "string" ? result.payload.sub : undefined;
    if (!userId) {
      throw new AppError("Invalid token payload", HTTPSTATUS.BAD_REQUEST);
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.deletedAt === null || !user.isDeactivated) {
      throw new AppError("Invalid or already active account", HTTPSTATUS.BAD_REQUEST);
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { isDeactivated: false, deletedAt: null },
    });

    await logAuthEvent({
      userId: user.id,
      event: "account_reactivated",
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    await createSession(user.id, {
      ip: req.ip,
      userAgent: req.headers["user-agent"] as string,
    });

    return updated;
  }

  async sendReactivationEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.isDeactivated || user.deletedAt === null) return;

    const token = generateVerificationToken();
    await Mailer.sendAccountReactivationEmail(user.email, token);
  }
}

// The AuthService class encapsulates the authentication logic for user registration, login, logout, token refresh, and account reactivation. It interacts with the database using Prisma, handles password hashing and verification, JWT token signing and verification, and logs authentication events. The service also extracts request metadata for logging purposes and sends verification emails when necessary. It is designed to be used in an Express.js application.