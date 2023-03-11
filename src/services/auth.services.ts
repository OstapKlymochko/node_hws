import { ApiError } from "../errors";
import { Token } from "../models";
import { ICredentials, ITokens, /*ITokens,*/ IUser } from "../types";
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
      const tokens = await TokenServices.generateTokenPair({
        id: user._id.toString(),
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
}

export const authServices = new AuthServices();
