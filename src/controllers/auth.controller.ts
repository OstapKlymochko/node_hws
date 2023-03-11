import { NextFunction, Request, Response } from "express";

import { authServices } from "../services";
import { ITokens } from "../types";

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
      const { user } = req.res.locals;
      const tokenPair = await authServices.login(creds, user);
      return res.status(200).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }
  async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ITokens>> {
    const { tokenInfo, payload } = req.res.locals;
    const tokenPair = await authServices.refresh(tokenInfo, payload);
    return res.status(200).json(tokenPair);
  }
}
export const authController = new AuthController();
