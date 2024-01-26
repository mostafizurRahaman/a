/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { IErrorSources } from "../interfaces/error";
import { ZodError } from "zod";
import configs from "../configs";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;

  let message: string = "Something went Wrong";
  let errorSources: IErrorSources[] = [];

  // **  check error types:

  console.log(err);

  // ** Send Final Response:
  res.status(statusCode).send({
    success: false,
    message,
    errorSources: err,
    stack: configs.node_env === "development" ? err.stack : null,
  });
};
