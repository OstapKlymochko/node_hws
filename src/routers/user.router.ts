import { Router } from "express";

import { userController } from "../controllers";
import { userMiddleware as uMdlwr } from "../middlewares";
import { authMiddleware as aMdlwr } from "../middlewares";

const router = Router();

router.get("/", aMdlwr.checkAccessToken, userController.getAll);

router.get(
  "/:userId",
  aMdlwr.checkAccessToken,
  uMdlwr.InvalidIdHandler,
  uMdlwr.NotFoundHandler,
  userController.getById
);
router.delete(
  "/:userId",
  aMdlwr.checkAccessToken,
  uMdlwr.InvalidIdHandler,
  uMdlwr.NotFoundHandler,
  userController.delete
);
router.put(
  "/:userId",
  aMdlwr.checkAccessToken,
  uMdlwr.InvalidIdHandler,
  uMdlwr.NotFoundHandler,
  uMdlwr.InvalidUpdateDataHandler,
  userController.update
);

export const userRouter = router;
