/* import { Router } from "express";
import { asyncHandler } from "../../../middlewares/asyncHandler";
import { authController } from "../auth-public/auth.controller";

const oauthRoutes = Router();

// OAuth redirect & callback (public)
oauthRoutes.get("/:provider", asyncHandler(authController.oauthRedirect));
oauthRoutes.get("/:provider/callback", asyncHandler(authController.oauthCallback));

// Protected
oauthRoutes.get("/activity", asyncHandler(authController.getActivityLogs));
oauthRoutes.post("/refresh/revoke", asyncHandler(authController.revokeRefreshToken));

export default oauthRoutes;
*/