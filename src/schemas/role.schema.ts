import { z } from "zod";
import { idSchema, roleNameSchema, timeStampSchema } from "@/schemas";

export const RoleSchema = z
  .object({
    id: idSchema,
    created_at: timeStampSchema,
    name: roleNameSchema,
  })
  .strict();

export const Role = RoleSchema.pick({ id: true, name: true });
export type RoleType = z.infer<typeof Role>;

export type RoleRow = z.infer<typeof RoleSchema>;
export type RoleName = z.infer<typeof roleNameSchema>;
