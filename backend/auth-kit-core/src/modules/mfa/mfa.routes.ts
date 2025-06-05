import { Router } from "express";
import { mfaController } from "./mfa.module";
import { authenticateJWT } from "../../common/strategies/jwt.strategy";

const mfaRoutes = Router();

// MFA
// Generate MFA QR code / secret
mfaRoutes.get("/setup", authenticateJWT, mfaController.generateMFASetup);
// Verify MFA after scanning QR
mfaRoutes.post("/verify", authenticateJWT, mfaController.verifyMFASetup);
// Revoke MFA
mfaRoutes.put("/revoke", authenticateJWT, mfaController.revokeMFA);
// Verify MFA during login (usually unauthenticated)
mfaRoutes.post("/verify/login", mfaController.verifyMFAForLogin);

// MFA Recovery
// Generate new backup codes (should revoke previous)
// mfaRoutes.post('/recovery/generate', authenticateJWT, mfaController.generateRecoveryCodes)
// View existing valid backup codes
// mfaRoutes.get('/recovery', authenticateJWT, mfaController.getRecoveryCodes)
// Use a backup code during login
// faRoutes.post('/verify/recovery', mfaController.verifyWithRecoveryCode)

export default mfaRoutes;
