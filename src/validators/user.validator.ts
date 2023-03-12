import * as Joi from "joi";

import { regexpConstants } from "../constants";
import { EGenders } from "../enums";

export class UserValidator {
  private static userName = Joi.string().min(2).max(50).trim();
  private static email = Joi.string()
    .regex(regexpConstants.EMAIL)
    .lowercase()
    .trim();
  private static password = Joi.string().regex(regexpConstants.PASSWORD);
  private static gender = Joi.valid(...Object.values(EGenders));

  static createUser = Joi.object({
    name: this.userName.required(),
    email: this.email.required(),
    password: this.password.required(),
    gender: this.gender.required(),
  });
  static updateUser = Joi.object({
    name: this.userName,
    gender: this.gender,
  });
  static loginUser = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
