import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../../../@types";
import { HTTPSTATUS } from "../../../../common/configs/http.config";
import { AccountService } from "./account.service";

export class AccountController {
  constructor(private accountService: AccountService) {}

  deactivateAccount = async (req: AuthenticatedRequest, res: Response) => {
    await this.accountService.deactivateAccount(req.user.id);
    res.status(HTTPSTATUS.OK).json({ message: "Account deactivated" });
  };

  deleteAccount = async (req: AuthenticatedRequest, res: Response) => {
    await this.accountService.deleteAccount(req.user.id);
    res.status(HTTPSTATUS.NO_CONTENT).send();
  };

  changePassword = async (req: AuthenticatedRequest, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    await this.accountService.changePassword(req.user.id, currentPassword, newPassword);
    res.status(HTTPSTATUS.OK).json({ message: "Password changed successfully" });
  };
}
