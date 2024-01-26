/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type TUserStatus = "active" | "blocked";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  status: TUserStatus;
  role: "manager";
  isDeleted?: boolean;
}

export interface IUserModel extends Model<IUser> {
  isUserExists: (id: string) => Promise<IUser | null>;
  isUserExistWithEmail: (email: string) => Promise<IUser | null>;
  isPasswordMatched: (plainPassword: string, hash: string) => Promise<boolean>;
}
