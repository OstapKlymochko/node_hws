import { NextFunction, Request, Response } from "express";

import { userServices } from "../services/user.services";
import { IUser } from "../types/user.types";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userServices.getAll();

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;
      const user = await userServices.getById(userId);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
