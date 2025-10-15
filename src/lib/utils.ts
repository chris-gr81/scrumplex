import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { supabase } from "./supabaseClient";
import type { RoleType } from "@/schemas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Guten Morgen";
  if (hour >= 12 && hour < 18) return "Guten Tag";
  return "Guten Abend";
};

// static data loading utils
export const loadRoles = async (): Promise<RoleType[] | null> => {
  const { data, error } = await supabase.from("roles").select("name, id");
  if (error) {
    console.error("Error loading roles: ", error.message);
    return null;
  }
  return data ?? null;
};
