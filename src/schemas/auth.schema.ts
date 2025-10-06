import { z } from "zod";
import { emailSchema, passwordSchema } from "./atoms";

export const AuthSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type ProfileInput = z.infer<typeof AuthSchema>;
