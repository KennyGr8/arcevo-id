import { Router } from "express";
import { asyncHandler } from "../../../middlewares/asyncHandler";
import { authController } from "./logic/auth.module";
import { authenticateJWT } from "../../../common/strategies/jwt.strategy";

const authRoutes = Router();

// Public routes for authentication
authRoutes.post("/register", asyncHandler(authController.register));
authRoutes.post("/login", asyncHandler(authController.login));
authRoutes.post("/refresh", asyncHandler(authController.refreshToken)); // ✅ POST
authRoutes.post("/reactivate", asyncHandler(authController.reactivateAccount));
authRoutes.get("/reactivate/:token", asyncHandler(authController.reactivateAccountWithToken));
authRoutes.post("/logout", authenticateJWT, asyncHandler(authController.logout));

export default authRoutes;
