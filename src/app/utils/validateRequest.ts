// **Create a validate Request function to validate with Zod Schema:

import { AnyZodObject } from "zod";
import catchAsync from "./catchAsync";

const validateRequest = (body: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    await body.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    next();
  });
};

export default validateRequest;
