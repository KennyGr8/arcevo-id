import { Router } from "express";
import { authenticateJWT } from "../../common/strategies/jwt.strategy";

import authRoutes from "./auth-public/auth.routes";
/* import passwordRoutes from "./password/password.routes";
import emailRoutes from "./email/email.routes";
import accountRoutes from "./account/account.routes";
import debugRoutes from "./debug/debug.routes";
import oauthRoutes from "./oauth/oauth.routes";
*/

const router = Router();

// Public routes
router.use("/", authRoutes);
router.use("/password", passwordRoutes);
router.use("/email", emailRoutes);
router.use("/reactivate", authRoutes); // Reactivate is public (no JWT)

// Protected routes (require JWT and asyncHandler wrapper where needed)
router.use(authenticateJWT);

router.use("/logout", authRoutes);
router.use("/update/email", emailRoutes);
router.use("/deactivate", accountRoutes);
router.use("/delete", accountRoutes);
router.use("/password/change", accountRoutes);
router.use("/debug", debugRoutes);
router.use("/activity", oauthRoutes);
router.use("/refresh/revoke", oauthRoutes);

router.use("/oauth", oauthRoutes);

export { router as authRoutes };
