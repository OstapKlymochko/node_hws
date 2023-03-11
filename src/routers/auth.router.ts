import { Router } from "express";

import { authController } from "../controllers";
import { authMiddleware as aMdlwr } from "../middlewares";
import { userMiddleware as uMdlwr } from "../middlewares";
const router = Router();

router.post(
  "/register",
  uMdlwr.InvalidRegisterValuesHandler,
  uMdlwr.fieldAlreadyExistsHandler("email"),
  authController.register
);
router.post(
  "/login",
  uMdlwr.InvalidLoginValuesHandler,
  uMdlwr.fieldNotExistHandler("email"),
  authController.login
);

router.post("/refresh", aMdlwr.checkRefreshToken, authController.refresh);

export const authRouter = router;
