import { Router } from "express";

import { userController } from "../controllers";
import { userMiddleware as mdlw } from "../middlewares/user.middleware";

const router = Router();

router.get("/", userController.getAll);
router.post("/", mdlw.InvalidUserErrorHandler, userController.create);

router.get(
  "/:userId",
  mdlw.userIdErrorHandler,
  mdlw.getByIdErrorHandler,
  userController.getById
);
router.put(
  "/:userId",
  mdlw.userIdErrorHandler,
  mdlw.InvalidUpdateUserErrorHandler,
  userController.update
);
router.delete("/:userId", mdlw.userIdErrorHandler, userController.delete);

export const userRouter = router;
