import { ApiError } from "../errors";
import { Token } from "../models";
import { ICredentials, IPayload, ITokens, /*ITokens,*/ IUser } from "../types";
import { passwordServices } from "./password.services";
import { TokenServices } from "./token.services";
import { userServices } from "./user.services";

class AuthServices {
  public async register(user: IUser): Promise<void> {
    try {
      const hashedPass = await passwordServices.hash(user.password);
      await userServices.createUser({ ...user, password: hashedPass });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async login(credentials: ICredentials, user: IUser): Promise<ITokens> {
    try {
      const { password } = credentials;

      const compareRes = await passwordServices.compare(
        password,
        user.password
      );
      if (!compareRes) {
        throw new ApiError("incorrect email or password", 400);
      }
      const tokens = TokenServices.generateTokenPair({
        _id: user._id,
        name: user.name,
      });
      await Token.create({
        _user_id: user._id,
        ...tokens,
      });

      return tokens;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async refresh(tokens: ITokens, payload: IPayload) {
    try {
      const { _id, name } = payload;
      const tokenPair = TokenServices.generateTokenPair({
        _id,
        name,
      });
      await Promise.all([
        Token.create({ _user_id: _id, ...tokenPair }),
        Token.deleteOne({ refreshToken: tokens.refreshToken }),
      ]);
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authServices = new AuthServices();
