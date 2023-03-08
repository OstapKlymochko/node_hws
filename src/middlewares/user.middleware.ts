import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
// import { User } from "../models/User.model";
// import { userServices } from "../services/user.services";
import { User } from "../models/User.model";

class UserMiddleware {
  public async getByIdError(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);

      if (!user) {
        throw new ApiError("User not found", 404);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
