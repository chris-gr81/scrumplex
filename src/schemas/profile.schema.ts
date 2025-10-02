import { z } from "zod";
import { emailSchema, idSchema, nameSchema } from "./atoms";

export const ProfileSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  id: idSchema,
});

export type ProfileInput = z.infer<typeof ProfileSchema>;
