import { NextFunction, Request, Response } from "express";

import { ETokens } from "../enums";
import { ApiError } from "../errors";
import { Token } from "../models";
import { TokenServices } from "../services";
// import { TokenServices } from "../services";

// import { ApiError } from "../errors";
// import { User } from "../models";
// import { IUser } from "../types";
// import { UserValidator } from "../validators";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");
      const payload = TokenServices.verifyToken(accessToken);
      const tokenInfo = await Token.findOne({ accessToken });
      if (!tokenInfo) {
        throw new ApiError("Invalid Token", 401);
      }
      req.res.locals = payload;
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
      const payload = TokenServices.verifyToken(
        refreshToken,
        ETokens.refreshToken
      );
      const tokenInfo = await Token.findOne({ accessToken: refreshToken });
      if (!tokenInfo) {
        throw new ApiError("Invalid Token", 401);
      }
      req.res.locals = { tokenInfo, payload };
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const authMiddleware = new AuthMiddleware();
