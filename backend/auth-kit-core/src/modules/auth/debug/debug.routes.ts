/* import { Router } from "express";
import { asyncHandler } from "../../../middlewares/asyncHandler";
import { authController } from "../auth-public/auth.controller";

const debugRoutes = Router();

debugRoutes.get("/token", asyncHandler(authController.getDecodedToken));
debugRoutes.get("/user", asyncHandler(authController.getUserFromToken));
debugRoutes.get("/check", asyncHandler(authController.checkAuthStatus));

export default debugRoutes;
*/