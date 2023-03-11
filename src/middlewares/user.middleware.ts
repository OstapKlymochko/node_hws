import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types";
import { UserValidator } from "../validators";

class UserMiddleware {
  async getByIdErrorHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);
      if (!user) {
        throw new ApiError("User not found", 422);
      }

      res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }
  async IdErrorHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      if (!isObjectIdOrHexString(userId)) {
        throw new ApiError("Invalid Id", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  async InvalidErrorHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.createUser.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }
      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }
  async InvalidUpdateErrorHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = req.body;
      const { error, value } = UserValidator.updateUser.validate(body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }
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

  //dynamic middlewares
  fieldNotExistHandler(
    fieldName: string,
    from: "body" | "query" | "params" = "body",
    dbField: keyof IUser = "email"
  ) {
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
        req.res.locals = { user };
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  fieldAlreadyExistsHandler(
    fieldName: string,
    from: "body" | "query" | "params" = "body",
    dbField: keyof IUser = "email"
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

export const userMiddleware = new UserMiddleware();
