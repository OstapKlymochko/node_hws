import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { User } from "../models";
import { UserValidator } from "../validators";

class AuthMiddleware {
  InvalidLoginValuesHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    try {
      const { error } = UserValidator.loginValues.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  InvalidRegisterValuesHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    try {
      const user = req.body;
      const { error, value } = UserValidator.createUser.validate(user);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }
  fieldNotExistHandler(fieldName: string, from = "body", dbField = fieldName) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const fieldValue = req[from][fieldName];
        const user = await User.findOne({ [dbField]: fieldValue });
        if (!user) {
          throw new ApiError(
            `User with ${fieldName} ${fieldValue} does not exist!`,
            404
          );
        }
        req.res.locals = user;
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  fieldAlreadyExistsHandler(
    fieldName: string,
    from = "body",
    dbField = fieldName
  ) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const fieldValue = req[from][fieldName];
        const user = await User.findOne({ [dbField]: fieldValue });
        if (user) {
          throw new ApiError(
            `User with ${fieldName} ${fieldValue} already exists!`,
            404
          );
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}
export const authMiddleware = new AuthMiddleware();
