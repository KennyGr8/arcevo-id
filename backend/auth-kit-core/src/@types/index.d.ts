import { SafeUser } from "./user";

declare global {
  namespace Express {
    interface User extends SafeUser {}
    interface Request {
      user?: SafeUser;
      sessionId?: string;
    }
  }
}
