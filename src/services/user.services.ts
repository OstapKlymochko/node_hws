import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types";

class UserServices {
  async getAll() {
    try {
      return await User.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  async getById(id: string): Promise<IUser> {
    try {
      return await User.findById(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userServices = new UserServices();
