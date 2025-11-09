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
  .min(8, { message: "Das Passwort benötigt mindestens 8 Zeichen" })
  .max(100, { message: "Das Passwort darf maximal 100 Zeichen haben" })
  .regex(/[A-Z]/, {
    message: "Das Passwort benötigt mindestens einen Großbuchstabe",
  })
  .regex(/[a-z]/, {
    message: "Das Passwort benötigt mindestens einen Kleinbuchstabe",
  })
  .regex(/[0-9]/, { message: "Das Passwort benötigt mindestens eine Zahl" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Das Passwort benötigt mindestens ein Sonderzeichen",
  });

export const timeStampSchema = z
  .string()
  .trim()
  .refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Ungültiges Datumsformat",
  })
  .optional();

// text schemas
export const shortTextSchema = z.string().trim().min(2).max(120);
export const longTextSchema = z
  .string()
  .trim()
  .max(10000)
  .optional()
  .nullable();
export const projectGoalSchema = z.string().trim().min(20).max(3000);
export const userStorySchema = z.string().trim().min(2).max(1000);
export const commentSchema = z.string().trim().min(1).max(2000);

// atomic role-name definition
export const roleNameSchema = z.enum([
  "Product Owner",
  "Scrum Master",
  "Developer",
  "Stakeholder (active)",
  "Stakeholder (passive)",
]);
