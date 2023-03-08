import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

router.get("/", userController.getAll);
router.get("/:userId", userMiddleware.getByIdError, userController.getById);

export const userRouter = router;
