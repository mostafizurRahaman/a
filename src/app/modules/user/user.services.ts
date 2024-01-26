import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import User from "./user.model";

// ** create User:
const createUserIntoDB = async (payload: IUser) => {
  // ** check is user Exists in database?:
  if (await User.isUserExistWithEmail(payload.email)) {
    throw new AppError(
      httpStatus.CONFLICT,
      "User Already Exists with  Email!!!",
    );
  }

  // ** create an user:
  const result = await User.create(payload);

  return result;
};

// ** Get User By Email:
const getUserByEmailAddressFromDB = async (email: string) => {
  if (!(await User.isUserExistWithEmail(email))) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User Doesn't Exists With This email!!!",
    );
  }

  const result = await User.findOne({ email });

  return result;
};

// ** Update user by Id:

const updateUserIntoDB = async (email: string, payload: Partial<IUser>) => {
  
  if (!(await User.isUserExistWithEmail(email))) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User Doesn't Exists With This email!!!",
    );
  }

  if (payload.email) {
    payload.email = email;
  }

  const result = await User.findOneAndUpdate(
    { email },
    {
      $set: payload,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

// **Delete User By Id :
const deleteUserFromDB = async (email: string) => {
  if (!(await User.isUserExistWithEmail(email))) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User Doesn't Exists With This email!!!",
    );
  }

  const result = await User.findOneAndUpdate(
    { email },
    {
      $set: { isDeleted: true },
    },
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

export const userServices = {
  createUserIntoDB,
  getUserByEmailAddressFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
