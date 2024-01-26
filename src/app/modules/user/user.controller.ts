import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.services";
import sendResponse from "./../../utils/sendResponse";
import httpStatus from "http-status";

// ** Create User Controllers:
const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created Successfully!!!",
    data: result,
  });
});

// ** Get user by email address:
const getUserByEmailAddress = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await userServices.getUserByEmailAddressFromDB(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Found Successfully!!!",
    data: result,
  });
});

// **  Update User By Email Address:

const updateUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;

  const result = await userServices.updateUserIntoDB(email, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Updated Successfully!!!",
    data: result,
  });
});

// ** Delete User By Email:
const deleteUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;

  const result = await userServices.deleteUserFromDB(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Deleted Successfully!!!",
    data: result,
  });
});

export const userController = {
  createUser,
  getUserByEmailAddress,
  updateUserByEmail,
  deleteUserByEmail,
};
