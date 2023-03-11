import { Router } from "express";

import { userController } from "../controllers";
import { authMiddleware } from "../middlewares";
import { userMiddleware as mdlw } from "../middlewares/user.middleware";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, userController.getAll);
router.post("/", mdlw.InvalidErrorHandler, userController.create);

router.get(
  "/:userId",
  mdlw.IdErrorHandler,
  mdlw.getByIdErrorHandler,
  userController.getById
);
router.put(
  "/:userId",
  mdlw.IdErrorHandler,
  mdlw.InvalidUpdateErrorHandler,
  userController.update
);
router.delete("/:userId", mdlw.IdErrorHandler, userController.delete);

export const userRouter = router;
