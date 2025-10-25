import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { supabase } from "./supabaseClient";
import type { CurrentProjectType, RoleType } from "@/schemas";

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

// expects string in uuid style (project id)
export const loadCurrentProject = async (
  userId: string
): Promise<{
  current_project: CurrentProjectType;
} | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("current_project")
    .eq("id", userId)
    .single();
  if (error) {
    console.error("Error loading current profile", error.message);
    return null;
  }
  return data ?? null;
};

// formating dates to european style dd.mm.yyyy
export const formatDateToEU = (dateString: string | undefined): string => {
  const date = new Date(dateString ? dateString : Date.now());
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
