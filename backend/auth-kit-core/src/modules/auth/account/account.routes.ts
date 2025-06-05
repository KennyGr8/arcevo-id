import { Router } from "express";
import { asyncHandler } from "../../../middlewares/asyncHandler";
import { authenticateJWT } from "../../../common/strategies/jwt.strategy";
import { accountController } from "./account.module";

const accountRoutes = Router();

accountRoutes.post("/deactivate", authenticateJWT, asyncHandler(accountController.deactivateAccount));
accountRoutes.delete("/delete", authenticateJWT, asyncHandler(accountController.deleteAccount));
accountRoutes.post("/password/change", authenticateJWT, asyncHandler(accountController.changePassword));

export default accountRoutes;
