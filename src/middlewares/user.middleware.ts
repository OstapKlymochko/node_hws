import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types";
import { UserValidator } from "../validators";

class UserMiddleware {
  public async InvalidIdHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      if (!isObjectIdOrHexString(userId)) {
        throw new ApiError("Invalid id", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public async NotFoundHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        throw new ApiError("No such user", 404);
      }
      req.res.locals = { user };
      next();
    } catch (e) {
      next(e);
    }
  }

  public async InvalidCreateDataHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.body;
      const { error, value } = UserValidator.createUser.validate(user);
      if (error || !value) {
        throw new ApiError(error.message, 400);
      }
      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }
  public async InvalidUpdateDataHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.body;
      const { error, value } = UserValidator.updateUser.validate(user);
      if (error || !value) {
        throw new ApiError(error.message, 400);
      }
      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }
  public AlreadyExistsHandler(
    fieldName: string,
    from: "body" | "params" | "query" = "body",
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
            `User with ${fieldName} ${fieldValue} already exists`,
            409
          );
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public async InvalidLoginValuesHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const creds = req.body;
      const { error } = UserValidator.loginUser.validate(creds);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public NotExistHandler(
    fieldName: string,
    from: "body" | "params" | "query" = "body",
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
            `User with ${fieldName} ${fieldValue} does not exist`,
            409
          );
        }
        req.res.locals = { user };
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}
export const userMiddleware = new UserMiddleware();
