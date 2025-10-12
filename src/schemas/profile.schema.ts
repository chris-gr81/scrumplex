import { z } from "zod";
import { idSchema, nameSchema, timeStampSchema } from "@/schemas";

export const ProfileSchema = z.object({
  id: idSchema,
  created_at: timeStampSchema,
  first_name: nameSchema,
  last_name: nameSchema,
  profile_complete: z.boolean(),
});

export type ProfileRow = z.infer<typeof ProfileSchema>;

export const BoardingSchema = ProfileSchema.pick({
  first_name: true,
  last_name: true,
});
export type BoardingData = z.infer<typeof BoardingSchema>;
