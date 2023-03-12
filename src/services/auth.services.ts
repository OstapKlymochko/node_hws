import { ApiError } from "../errors";
import { Token, User } from "../models";
import { ICredentials, IPayload, ITokens, IUser } from "../types";
import { passwordServices } from "./password.services";
import { tokenServices } from "./token.services";

class AuthServices {
  public async register(user: IUser): Promise<void> {
    try {
      const { password } = user;
      const hashed = await passwordServices.hashPassword(password);
      await User.create({
        ...user,
        password: hashed,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async login(credentials: ICredentials, user: IUser) {
    try {
      const compareRes = await passwordServices.compare(
        credentials.password,
        user.password
      );
      if (!compareRes) {
        throw new ApiError("Invalid email or password", 400);
      }
      const tokenPair = await tokenServices.generateTokenPair({
        _id: user._id,
        name: user.name,
      });

      await Token.create({
        _user_id: user._id,
        ...tokenPair,
      });
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async refresh(
    tokenInfo: ITokens,
    payload: IPayload
  ): Promise<ITokens> {
    try {
      const tokenPair = await tokenServices.generateTokenPair(payload);
      await Promise.all([
        await Token.create({
          _user_id: payload._id,
          ...tokenPair,
        }),
        await Token.deleteOne({ refreshToken: tokenInfo.refreshToken }),
      ]);
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}
export const authServices = new AuthServices();
