import z from "zod";
import { UserStatus } from "./user.constants";

// **Create a User Validation Schema for create user:
const createUserValidationSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: "First Name is Required!",
      invalid_type_error: "FirstName must be string!",
    }),
    lastName: z.string({
      required_error: "Last Name is Required!",
      invalid_type_error: "LastName must be string!!!",
    }),
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
          message: "Enter a valida email!!!",
        },
      ),

    phone: z.string().refine(
      (value) => {
        return /^(?:8801(?:3|4|5|6|7|8|9)|01[3-9])[0-9]{8}$/.test(value);
      },
      {
        message: "Provide valid Phone Number!!!",
      },
    ),
    password: z.string({
      required_error: "Password is required!!!",
      invalid_type_error: "Password should string!!!",
    }),
    status: z
      .enum([...UserStatus] as [string, ...string[]])
      .default("active")
      .optional(),
  }),
});

// ** User Update validation Schema :
const updateUserValidationSchema = z.object({
  body: z.object({
    firstName: z
      .string({
        required_error: "First Name is Required!",
        invalid_type_error: "FirstName must be string!",
      })
      .optional(),
    lastName: z
      .string({
        required_error: "Last Name is Required!",
        invalid_type_error: "LastName must be string!!!",
      })
      .optional(),
    phone: z
      .string()
      .refine(
        (value) => {
          return /^(?:8801(?:3|4|5|6|7|8|9)|01[3-9])[0-9]{8}$/.test(value);
        },
        {
          message: "Provide valid Phone Number!!!",
        },
      )
      .optional(),
    password: z
      .string({
        required_error: "Password is required!!!",
        invalid_type_error: "Password should string!!!",
      })
      .optional(),
    role: z
      .enum(["manager"] as [string, ...string[]])
      .optional()
      .default("manager"),
    status: z
      .enum([...UserStatus] as [string, ...string[]])
      .default("active")
      .optional(),
  }),
});

export const userValidationSchema = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
