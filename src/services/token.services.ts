import * as jwt from "jsonwebtoken";

import { configs } from "../configs";
import { ETokens } from "../enums";
import { ApiError } from "../errors";
import { IPayload, ITokens } from "../types";

export class TokenServices {
  static generateTokenPair(payload: IPayload): ITokens {
    const accessToken = jwt.sign(payload, "@cce$$_$ecret", {
      expiresIn: "5m",
    });
    const refreshToken = jwt.sign(payload, "refre$h_$ecret", {
      expiresIn: "6m",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  static verifyToken(token: string, tokenType = ETokens.accessToken): IPayload {
    try {
      let secret = "";

      switch (tokenType) {
        case ETokens.accessToken:
          secret = configs.ACCESS_SECRET;
          break;
        case ETokens.refreshToken:
          secret = configs.REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret) as IPayload;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}
