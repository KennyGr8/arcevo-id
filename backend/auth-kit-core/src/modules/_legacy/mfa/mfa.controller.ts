import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { MfaService } from "./mfa.service";
import { HTTPSTATUS } from "../../database/config/http.config";
import { verifyMfaForLoginSchema, verifyMfaSchema } from "../../common/validators/mfa.validator";
import { setAuthenticationCookies } from "../../common/utils/cookie";

export class MfaController {
  private mfaService: MfaService;

  constructor(mfaService: MfaService) {
    this.mfaService = mfaService;
  }

  public generateMFASetup = asyncHandler(async (req: Request, res: Response) => {
    const { secret, qrImageUrl, message } = await this.mfaService.generateMFASetup(req);
    return res.status(HTTPSTATUS.OK).json({
      message,
      secret,
      qrImageUrl,
    });
  });

  public verifyMFASetup = asyncHandler(async (req: Request, res: Response) => {
    const { token, method, type } = verifyMfaSchema.parse({
      ...req.body,
    });
    const { userPreferences, message } = await this.mfaService.verifyMFASetup(req, token, method, type);
    return res.status(HTTPSTATUS.OK).json({
      message: message,
      userPreferences: userPreferences,
    });
  });

  public revokeMFA = asyncHandler(async (req: Request, res: Response) => {
    const { message, userPreferences } = await this.mfaService.revokeMFA(req);
    return res.status(HTTPSTATUS.OK).json({
      message,
      userPreferences,
    });
  });

  public verifyMFAForLogin = asyncHandler(async (req: Request, res: Response) => {
    const { token, email, method, type } = verifyMfaForLoginSchema.parse({
      ...req.body,
      userAgent: req.headers["user-agent"],
    });

    const { accessToken, refreshToken, user } = await this.mfaService.verifyMFAForLogin(
      token,
      email,
      method,
      type,
    );

    return setAuthenticationCookies({
      res,
      accessToken,
      refreshToken,
    })
      .status(HTTPSTATUS.OK)
      .json({
        message: "Verified & login successfully",
        user,
      });
  });
}
