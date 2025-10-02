import { z } from "zod";

// names including spaces, hyphens and apostrophes, must start with a letter
export const nameSchema = z
  .string()
  .trim()
  .min(2, { message: "Mindestens 2 Zeichen" })
  .max(60, { message: "Maximal 60 Zeichen" })
  .regex(/^[\p{L}][\p{L}\p{M}\p{Zs}'-]*$/u, {
    error: "Ungültige Zeichen im Namen",
  })
  .transform((s) => s.replace(/\s+/g, " "));

// email schema
export const emailSchema = z.email({
  error: "Bitte eine gültige E-Mail Adresse eingeben.",
});

// id-schema
export const idSchema = z.uuid({ error: "Ungültige ID" });

// password-schema
export const passwordSchema = z
  .string()
  .trim()
  .min(8, { message: "Mindestens 8 Zeichen" })
  .max(100, { message: "Maximal 100 Zeichen" })
  .regex(/[A-Z]/, { message: "Mindestens ein Großbuchstabe" })
  .regex(/[a-z]/, { message: "Mindestens ein Kleinbuchstabe" })
  .regex(/[0-9]/, { message: "Mindestens eine Zahl" })
  .regex(/[^A-Za-z0-9]/, { message: "Mindestens ein Sonderzeichen" });
