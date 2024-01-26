import express from "express";
import validateRequest from "./../../utils/validateRequest";
import { AuthValidationSchema } from "./auth.validatation";
import { authControllers } from "./auth.controller";

const router = express.Router();

router
  .route("/login")
  .post(
    validateRequest(AuthValidationSchema.loginValidationSchema),
    authControllers.login,
  );

export const authRoutes = router;
