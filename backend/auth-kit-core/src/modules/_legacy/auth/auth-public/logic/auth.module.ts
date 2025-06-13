import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export const AuthModule = {
  controller: new AuthController(),
  service: new AuthService(),
};
