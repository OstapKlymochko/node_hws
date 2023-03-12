import { Router } from "express";

import { authController } from "../controllers";
import { userMiddleware as uMdlwr } from "../middlewares";
import { authMiddleware as aMdlwr } from "../middlewares";

const router = Router();

router.post(
  "/register",
  uMdlwr.InvalidCreateDataHandler,
  uMdlwr.AlreadyExistsHandler("email"),
  authController.register
);
router.post(
  "/login",
  uMdlwr.InvalidLoginValuesHandler,
  uMdlwr.NotExistHandler("email"),
  authController.login
);

router.post("/refresh", aMdlwr.checkRefreshToken, authController.refresh);

export const authRouter = router;
