import { IJwtPayload } from "./../../interfaces/error";
import { createToken } from "./../../utils/createToken";
import User from "./../user/user.model";
import AppError from "./../../errors/AppError";
import httpStatus from "http-status";
import configs from "../../configs";


const loginUser = async (email: string, password: string) => {
  const user = await User.isUserExistWithEmail(email);

  // ** check is user Exists with this email?:

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found!!!");
  }

  // ** Check is use deleted or not?:
  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User Is Deleted!!!");
  }

  // ** check isUser Blocked?
  if (user.status === "blocked") {
    throw new AppError(httpStatus.NOT_FOUND, "User is blocked!!!");
  }

  //** Is Password Matched?:
  if (!(await User.isPasswordMatched(password, user.password))) {
    throw new AppError(httpStatus.NOT_FOUND, "Credential Not Matched!!!");
  }

  // ** access token payload:
  const jwtPayload: IJwtPayload = {
    email: user.email,
    role: user.role,
  };

  // ** Create An Access Token:
  const accessToken = createToken(
    jwtPayload,
    configs.jwt_access_token as string,
    configs.jwt_access_token_expiresIn as string,
  );

  //**  Create An Refresh Token:
  const refreshToken = createToken(
    jwtPayload,
    configs.jwt_access_token as string,
    configs.jwt_access_token_expiresIn as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const authServices = {
  loginUser,
};
