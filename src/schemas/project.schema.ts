import { z } from "zod";
import {
  idSchema,
  projectGoalSchema,
  shortTextSchema,
  timeStampSchema,
} from "@/schemas";

export const ProjectSchema = z.object({
  id: idSchema,
  created_at: timeStampSchema,
  name: shortTextSchema,
  goal: projectGoalSchema,
  finished: z.boolean(),
});

export type ProjectRow = z.infer<typeof ProjectSchema>;
