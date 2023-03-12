import { ApiError } from "../errors";
import { Token, User } from "../models";
import { IUser } from "../types";

class UserServices {
  public async getAll(): Promise<IUser[]> {
    try {
      return await User.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async getById(id: string): Promise<IUser> {
    try {
      return await User.findById(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async delete(id: string): Promise<void> {
    try {
      await User.deleteOne({ _id: id });
      await Token.deleteOne({ _user_id: id });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userServices = new UserServices();
