import { z } from "zod";

// ** Create a validation schema for login :
const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required!!!",
        invalid_type_error: "Email must be string!!!",
      })
      .email({ message: "Enter a Valid Email!!!" })
      .refine(
        (value) => {
          return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value);
        },
        {
          message: "Enter a valid email!!!",
        },
      ),
    password: z.string({
      required_error: "Password is required!!!",
      invalid_type_error: "Password should string!!!",
    }),
  }),
});

export const AuthValidationSchema = {
  loginValidationSchema,
};
