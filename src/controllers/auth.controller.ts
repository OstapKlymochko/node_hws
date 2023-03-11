import { NextFunction, Request, Response } from "express";

import { authServices } from "../services";
import { ITokens, IUser } from "../types";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      await authServices.register(req.body);
      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }
  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ITokens>> {
    try {
      const creds = req.body;
      const user = req.res.locals;
      console.log(creds, user);
      const tokenPair = await authServices.login(creds, user as IUser);
      return res.status(200).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }
}
export const authController = new AuthController();
