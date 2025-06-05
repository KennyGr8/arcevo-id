import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import {
  LoginDto,
  RegisterDto,
  ReactivateDto,
} from "./auth.dto";
import { HTTPSTATUS } from "../../../database/config/http.config";
import { config } from "../../../database/config/app.config"
const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    const data: RegisterDto = req.body;
    const result = await authService.registerUser(data, req);

    // Optionally set refresh token in HTTP-only cookie
    res.cookie("refreshToken", result.tokens.refreshToken, {
      httpOnly: true,
      secure: config.N === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(HTTPSTATUS.CREATED).json({
      success: true,
      data: {
        user: result.user,
        accessToken: result.tokens.accessToken,
      },
    });
  }

  async login(req: Request, res: Response) {
    const data: LoginDto = req.body;
    const result = await authService.loginUser(data, req);

    // Optionally set refresh token in HTTP-only cookie
    res.cookie("refreshToken", result.tokens.refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(HTTPSTATUS.OK).json({
      success: true,
      data: {
        user: result.user,
        accessToken: result.tokens.accessToken,
      },
    });
  }

  async logout(req: Request, res: Response) {
    const sessionId = req.user?.sessionId;
    if (!sessionId) {
      return res
        .status(HTTPSTATUS.UNAUTHORIZED)
        .json({ success: false, message: "Not authenticated" });
    }

    await authService.logoutUser(sessionId);

    // Optionally clear the refresh token cookie
    res.clearCookie("refreshToken");

    return res.status(HTTPSTATUS.OK).json({
      success: true,
      message: "Logged out successfully",
    });
  }

  async refreshToken(req: Request, res: Response) {
    const oldRefreshToken = req.body.refreshToken || req.cookies?.refreshToken;
    if (!oldRefreshToken) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        success: false,
        message: "Refresh token required",
      });
    }

    const result = await authService.refreshToken(oldRefreshToken, req);

    // Optionally update refresh token in cookie
    res.cookie("refreshToken", result.tokens.refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(HTTPSTATUS.OK).json({
      success: true,
      data: {
        user: result.user,
        accessToken: result.tokens.accessToken,
      },
    });
  }

  async reactivateAccount(req: Request, res: Response) {
    const data: ReactivateDto = req.body;
    const user = await authService.reactivateWithCredentials(data, req);

    return res.status(HTTPSTATUS.OK).json({
      success: true,
      message: "Account reactivated successfully",
      user,
    });
  }

  async reactivateAccountWithToken(req: Request, res: Response) {
    const token = req.params.token;
    const user = await authService.reactivateWithToken(token, req);

    return res.status(HTTPSTATUS.OK).json({
      success: true,
      message: "Account reactivated successfully",
      user,
    });
  }

  async sendReactivationEmail(req: Request, res: Response) {
    const { email } = req.body;
    await authService.sendReactivationEmail(email);

    return res.status(HTTPSTATUS.OK).json({
      success: true,
      message: "Reactivation email sent (if account is deactivated)",
    });
  }
}

// This code defines the AuthController class which handles user authentication operations such as registration, login, logout, token refresh, and account reactivation. Each method interacts with the AuthService to perform the necessary business logic and returns appropriate HTTP responses. The controller methods are designed to be used with Express.js routes.