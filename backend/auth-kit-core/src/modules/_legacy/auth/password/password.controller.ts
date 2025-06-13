import { Request, Response } from "express";
import { PasswordService } from "./password.service";
import { ForgotPasswordDto, ResetPasswordDto } from "./password.dto";
import { HTTPSTATUS } from "../../../database/config/http.config";

export class PasswordController {
  static async forgotPassword(req: Request, res: Response) {
    const data = req.body as ForgotPasswordDto;
    await PasswordService.sendResetPasswordEmail(data);
    return res.status(HTTPSTATUS.OK).json({
      message: "If an account with that email exists, a reset email has been sent.",
    });
  }

  static async resetPassword(req: Request, res: Response) {
    const { token, password } = req.body as ResetPasswordDto;
    await PasswordService.resetPassword(token, password);
    return res.status(HTTPSTATUS.OK).json({
      message: "Password reset successful.",
    });
  }
}
