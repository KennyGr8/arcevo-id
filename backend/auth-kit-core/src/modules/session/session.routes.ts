import { Router } from "express";
import { sessionController } from "./session.module";
import { authenticateJWT } from "../../common/strategies/jwt.strategy";
import { asyncHandler } from "../../middlewares/asyncHandler";

const sessionRoutes = Router();

sessionRoutes.get("/all", authenticateJWT, asyncHandler(sessionController.getAllSession));
sessionRoutes.get("/", authenticateJWT, asyncHandler(sessionController.getSession));
sessionRoutes.delete("/delete/:id", authenticateJWT, asyncHandler(sessionController.deleteSession));

sessionRoutes.post(
  "/revoke",
  authenticateJWT,
  asyncHandler(sessionController.revokeCurrentSession)
);
sessionRoutes.post(
  "/revoke/all",
  authenticateJWT,
  asyncHandler(sessionController.revokeAllSessions)
);

export default sessionRoutes;
