import configs from "../../configs";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.services";
import sendResponse from "./../../utils/sendResponse";
import httpStatus from "http-status";

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await authServices.loginUser(email, password);

  // ** Set Cookies:
  res.cookie("refreshToken", result.refreshToken, {
    secure: configs.node_env === "production",
    httpOnly: true,
  });

  // ** send Response with accessToken :
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "You are logged In Successfully!!",
    data: {
      accessToken: result.accessToken,
    },
  });
});






export const authControllers = {
  login,
};
