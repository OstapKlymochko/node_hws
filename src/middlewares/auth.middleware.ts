import { NextFunction, Request, Response } from "express";

import { ETokens } from "../enums";
import { ApiError } from "../errors";
import { Token } from "../models";
import { tokenServices } from "../services";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");
      if (!accessToken) {
        throw new ApiError("Token is not provided", 401);
      }
      const tokenInfo = await Token.findOne({ accessToken });
      if (!tokenInfo) {
        throw new ApiError("Invalid token", 401);
      }
      const payload = tokenServices.checkToken(accessToken);
      req.res.locals = { payload, tokenInfo };
      next();
    } catch (e) {
      next(e);
    }
  }
  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.get("Authorization");
      if (!refreshToken) {
        throw new ApiError("Token is not provided", 401);
      }
      const tokenInfo = await Token.findOne({ refreshToken });
      if (!tokenInfo) {
        throw new ApiError("Invalid token", 401);
      }
      const payload = tokenServices.checkToken(refreshToken, ETokens.refresh);
      req.res.locals = { payload, tokenInfo };
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const authMiddleware = new AuthMiddleware();
