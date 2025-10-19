import * as yup from "yup";
export const createUserSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters long"),

  lastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters long"),

  email: yup
    .string()
    .trim()
    .lowercase()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),

  refreshToken: yup.string().nullable(),

  isAccountBlocked: yup.boolean().default(false),
});

export const updateUserSchema = createUserSchema.partial();
