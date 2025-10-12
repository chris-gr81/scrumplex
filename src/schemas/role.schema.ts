import { z } from "zod";
import { idSchema, roleNameSchema, timeStampSchema } from "@/schemas";

export const RoleSchema = z
  .object({
    id: idSchema,
    created_at: timeStampSchema,
    name: roleNameSchema,
  })
  .strict();

export type RoleRow = z.infer<typeof RoleSchema>;
export type RoleName = z.infer<typeof roleNameSchema>;
