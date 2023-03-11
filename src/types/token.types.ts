import { IUser } from "./user.types";

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
export type IPayload = Pick<IUser, "_id" | "name">;
