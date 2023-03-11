import { Router } from "express";

import { authController } from "../controllers";
import { authMiddleware as mdlwr } from "../middlewares";
const router = Router();

router.post(
  "/register",
  mdlwr.InvalidRegisterValuesHandler,
  mdlwr.fieldAlreadyExistsHandler("email"),
  authController.register
);
router.post(
  "/login",
  mdlwr.InvalidLoginValuesHandler,
  mdlwr.fieldNotExistHandler("email"),
  authController.login
);

export const authRouter = router;
