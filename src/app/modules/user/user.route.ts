import express from "express";
import validateRequest from "../../utils/validateRequest";
import { userValidationSchema } from "./user.validation";
import { userController } from "./user.controller";

const router = express.Router();

router
  .route("/create-user")
  .post(
    validateRequest(userValidationSchema.createUserValidationSchema),
    userController.createUser,
  );

router
  .route("/:email")
  .get(userController.getUserByEmailAddress)
  .put(
    validateRequest(userValidationSchema.updateUserValidationSchema),
    userController.updateUserByEmail,
  )
  .delete(userController.deleteUserByEmail);

export const userRouter = router;
