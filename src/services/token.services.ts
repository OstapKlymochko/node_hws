import jwt from "jsonwebtoken";

import { configs } from "../configs";
import { ETokens } from "../enums";
import { ApiError } from "../errors";
import { IPayload, ITokens } from "../types";
class TokenServices {
  async generateTokenPair(payload: IPayload): Promise<ITokens> {
    const accessToken = jwt.sign(payload, configs.ACCESS_SECRET, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(payload, configs.REFRESH_SECRET, {
      expiresIn: "90s",
    });

    return {
      accessToken,
      refreshToken,
    };
  }
  checkToken(token: string, tokenType = ETokens.access): IPayload {
    try {
      let secret = "";
      switch (tokenType) {
        case ETokens.access:
          secret = configs.ACCESS_SECRET;
          break;
        case ETokens.refresh:
          secret = configs.REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret);
    } catch (e) {
      throw new ApiError(e.message, 401);
    }
  }
}
export const tokenServices = new TokenServices();
