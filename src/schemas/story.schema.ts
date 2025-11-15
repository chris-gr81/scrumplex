import { z } from "zod";
import {
  idSchema,
  shortTextSchema,
  timeStampSchema,
  userStorySchema,
} from "./atoms";

export const DodItemSchema = z.object({
  definition: shortTextSchema,
  done: z.boolean().default(false),
});

export const InvestSchema = z.object({
  id: idSchema.or(z.literal("")),
  userstory_id: idSchema.or(z.literal("")),
  independent_check: z.boolean().optional(),
  independent_rate: z.number().nullable().optional(),
  negotiable_check: z.boolean().optional(),
  negotiable_rate: z.number().nullable().optional(),
  valuable_check: z.boolean().optional(),
  valuable_rate: z.number().nullable().optional(),
  estimable_check: z.boolean().optional(),
  estimable_rate: z.number().nullable().optional(),
  small_check: z.boolean().optional(),
  small_rate: z.number().nullable().optional(),
  testable_check: z.boolean().optional(),
  testable_rate: z.number().nullable().optional(),
});

export const StorySchema = z.object({
  id: idSchema.or(z.literal("")),
  created_at: timeStampSchema.optional().or(z.literal("")),
  project_id: idSchema.optional().or(z.literal("")),
  name: shortTextSchema.optional(),
  invest: InvestSchema,
  storypoints: shortTextSchema.optional(),
  priority: shortTextSchema.optional(),
  status: shortTextSchema.optional(),
  story_as: userStorySchema.optional(),
  story_like: userStorySchema.optional(),
  story_cause: userStorySchema.optional(),
  updated_at: timeStampSchema.optional().or(z.literal("")),
  definition_of_done: z.array(DodItemSchema).default([]),
});

export const StoryListSchema = z.object({
  project_id: idSchema,
});

export type StoryType = z.infer<typeof StorySchema>;
export type DodItemType = z.infer<typeof DodItemSchema>;

// default-data
export const StoryDefault: StoryType = {
  id: "",
  created_at: "",
  project_id: "",
  name: "",
  invest: {
    id: "",
    userstory_id: "",
    independent_check: false,
    independent_rate: 0,
    negotiable_check: false,
    negotiable_rate: 0,
    valuable_check: false,
    valuable_rate: 0,
    estimable_check: false,
    estimable_rate: 0,
    small_check: false,
    small_rate: 0,
    testable_check: false,
    testable_rate: 0,
  },
  storypoints: "",
  priority: "",
  status: "",
  story_as: "",
  story_like: "",
  story_cause: "",
  updated_at: "",
  definition_of_done: [],
};
