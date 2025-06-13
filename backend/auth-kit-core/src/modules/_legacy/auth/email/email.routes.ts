/* import { Router } from "express";
import { asyncHandler } from "../../../middlewares/asyncHandler";
import { authController } from "../auth-public/auth.controller";

const emailRoutes = Router();

// Public
emailRoutes.post("/verify/email", asyncHandler(authController.verifyEmail));
emailRoutes.post("/verify/email/resend", asyncHandler(authController.resendVerificationEmail));
emailRoutes.post("/update/email/confirm", asyncHandler(authController.confirmEmailChange));

// Protected (note: these routes are used with JWT in root routes)
emailRoutes.post("/update/email", asyncHandler(authController.updateEmail));

export default emailRoutes;
*/