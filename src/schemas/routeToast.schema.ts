import { z } from "zod";

export const RouteToastSchema = z.object({
  type: z.enum(["success", "error", "info", "warning", "loading"]),
  message: z.string(),
});

export type RouteToastType = z.infer<typeof RouteToastSchema>;
