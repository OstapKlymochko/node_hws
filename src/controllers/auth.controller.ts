import { NextFunction, Request, Response } from "express";

import { authServices } from "../services";
import { ITokens } from "../types";

class AuthController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const user = req.body;
      await authServices.register(user);
      return res.status(201).json("Created");
    } catch (e) {
      next(e);
    }
  }
  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ITokens>> {
    try {
      const { user } = req.res.locals;
      const credentials = req.body;
      const tokenPair = await authServices.login(credentials, user);
      return res.status(200).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }
  public async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ITokens>> {
    try {
      const {
        payload: { _id, name },
        tokenInfo,
      } = req.res.locals;
      const tokenPair = await authServices.refresh(tokenInfo, { _id, name });
      return res.status(200).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }
}
export const authController = new AuthController();
