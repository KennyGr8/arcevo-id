import { Request, Response } from "express";
import { SessionService } from "./session.service";
import { HTTPSTATUS } from "../../database/config/http.config";

export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  async getAllSession(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({ message: "User ID is required" });
    }
    const sessions = await this.sessionService.getAllSessions(userId);
    return res.status(HTTPSTATUS.OK).json({ sessions });
  }

  async getSession(req: Request, res: Response) {
    const userId = req.user?.id;
    const sessionId = req.query.id as string | undefined;
    if (!userId || !sessionId) {
      return res
        .status(HTTPSTATUS.BAD_REQUEST)
        .json({ message: "User ID and session ID are required" });
    }
    const session = await this.sessionService.getSessionById(userId, sessionId);
    return res.status(HTTPSTATUS.OK).json({ session });
  }

  async deleteSession(req: Request, res: Response) {
    const userId = req.user?.id;
    const sessionId = req.params.id;
    if (!userId || !sessionId) {
      return res
        .status(HTTPSTATUS.BAD_REQUEST)
        .json({ message: "User ID and session ID are required" });
    }
    await this.sessionService.deleteSessionById(userId, sessionId);
    return res.status(HTTPSTATUS.OK).json({ message: "Session deleted" });
  }

  async deleteAllSessions(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({ message: "User ID is required" });
    }
    await this.sessionService.deleteAllSessions(userId);
    return res.status(HTTPSTATUS.OK).json({ message: "All sessions deleted" });
  }

  async revokeCurrentSession(req: Request, res: Response) {
    const sessionId = req.sessionId;
    const userId = req.user?.id;
    if (!userId || !sessionId) {
      return res
        .status(HTTPSTATUS.BAD_REQUEST)
        .json({ message: "User ID and Session ID are required" });
    }
    await this.sessionService.revokeSessionById(userId, sessionId);
    return res.status(HTTPSTATUS.OK).json({ message: "Current session revoked" });
  }

  async revokeAllSessions(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({ message: "User ID is required" });
    }
    await this.sessionService.revokeAllSessions(userId);
    return res.status(HTTPSTATUS.OK).json({ message: "All sessions revoked" });
  }
}
