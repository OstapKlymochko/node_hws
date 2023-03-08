export enum EGenders {
  male = "male",
  female = "Female",
  mixed = "mixed",
}

export interface IUser {
  name: string;
  email: string;
  gender?: string;
}
export interface ICommonResponse<T> {
  message: string;
  data: T;
}
