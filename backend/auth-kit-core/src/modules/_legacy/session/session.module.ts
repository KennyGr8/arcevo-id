import { SessionController } from "./session.controller";
import { SessionService } from "./session.service";

export const sessionService = new SessionService();
export const sessionController = new SessionController(sessionService);
