import { z } from "zod";
import { idSchema, timeStampSchema } from "@/schemas";

export const ProjectMemberSchema = z.object({
  id: idSchema,
  created_at: timeStampSchema,
  project_id: idSchema,
  profile_id: idSchema,
  role_id: idSchema,
});

export type ProjectMembersRow = z.infer<typeof ProjectMemberSchema>;
