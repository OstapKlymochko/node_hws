import { NextFunction, Request, Response } from "express";

import { User } from "../models";
import { userServices } from "../services";
import { ICommonResponse, IUser } from "../types";

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
      const { user } = req.res.locals;
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IUser>>> {
    try {
      const body = req.body;
      const user = await User.create(body);
      return res.status(201).json({
        message: `User ${user.name} created!`,
        data: user,
      });
    } catch (e) {
      next(e);
    }
  }
  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const body = req.body;
      const { userId } = req.params;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { ...body },
        { new: true }
      );
      return res.status(201).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<number>> {
    try {
      const { userId } = req.params;
      await userServices.delete(userId);
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}
export const userController = new UserController();
