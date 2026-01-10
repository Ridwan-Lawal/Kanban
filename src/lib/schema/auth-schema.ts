import z from "zod";

export const RegisterSchema = z
  .object({
    email: z.email("Enter a valid email").max(255, "Enter a valid email").trim(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character")
      .trim(),

    confirmPassword: z.string().min(1, "Please confirm your password").trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords do not match",
  });

export type RegisterType = z.infer<typeof RegisterSchema>;
