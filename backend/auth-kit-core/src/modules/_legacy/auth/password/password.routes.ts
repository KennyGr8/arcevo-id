import { Router } from "express";
import { asyncHandler } from "../../../middlewares/asyncHandler";
import { PasswordController } from "./password.controller";

const passwordRoutes = Router();

passwordRoutes.post("/forgot", asyncHandler(PasswordController.forgotPassword));

passwordRoutes.post("/reset", asyncHandler(PasswordController.resetPassword));

export default passwordRoutes;
