import * as jwt from "jsonwebtoken";

import { IPayload, ITokens } from "../types";

export class TokenServices {
  static generateTokenPair(payload: IPayload): ITokens {
    const accessToken = jwt.sign(payload, "@cce$$_$ecret", {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(payload, "refre$h_$ecret", {
      expiresIn: "90s",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
