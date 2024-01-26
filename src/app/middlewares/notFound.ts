/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import httpStatus from "http-status";
import sendResponse from "../utils/sendResponse";

export const notFound: RequestHandler = (req, res, next) => {
  const path = req.path;

  sendResponse(res, {
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: `Route Not Found for this path ${path}`,
    data: null,
  });
};
