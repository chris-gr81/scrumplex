import { z } from "zod";
import {
  idSchema,
  projectGoalSchema,
  projectNameSchema,
  timeStampSchema,
} from "@/schemas";

export const ProjectSchema = z.object({
  id: idSchema,
  created_at: timeStampSchema,
  name: projectNameSchema,
  goal: projectGoalSchema,
  finished: z.boolean(),
  owner_id: idSchema.optional(),
});

export type ProjectRow = z.infer<typeof ProjectSchema>;

export const NewProjectSchema = ProjectSchema.pick({
  name: true,
  goal: true,
  finished: true,
});

export type NewProjectData = z.infer<typeof NewProjectSchema>;

export const CurrentProjectSchema = ProjectSchema.shape.id;
export type CurrentProjectType = z.infer<typeof CurrentProjectSchema>;

export const ProjectListSchema = z.array(
  ProjectSchema.extend({
    ownerName: z.string().optional(),
  })
);
export type ProjectListType = z.infer<typeof ProjectListSchema>;
