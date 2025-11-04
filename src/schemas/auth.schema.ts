import { z } from "zod";
import { emailSchema, passwordSchema } from "@/schemas";

export const SignUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type SignUpType = z.infer<typeof SignUpSchema>;

export const LoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: "Bitte Passwort eingeben." }),
});

export type LoginType = z.infer<typeof LoginSchema>;
