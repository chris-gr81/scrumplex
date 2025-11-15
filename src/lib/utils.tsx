import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { supabase } from "./supabaseClient";
import type {
  CurrentProjectType,
  RoleType,
  DodItemType,
  StoryType,
} from "@/schemas";
import type { ZodError } from "zod";
import { toast } from "sonner";

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

// formating zod errors to toaster-ready-messages
export const handleZodError = (error: ZodError) => {
  toast.error(
    <ul>
      <strong>Üngültige Eingabe:</strong>
      {error.issues.map((issue, i) => (
        <li key={i}>{issue.message}</li>
      ))}
    </ul>
  );
};

// cleaning empty rows out of a dod-array
export const dodCleanUp = (dod: DodItemType[]) => {
  if (!dod) return [];
  const newDod = dod.filter((item) => {
    const checkItem = item.definition.trim();
    return checkItem !== "" && checkItem !== null && checkItem !== undefined;
  });
  return newDod;
};

// preparing a story object for db
export const prepareStoryForDB = (
  item: StoryType,
  currentProject: CurrentProjectType
) => {
  const { created_at, id, ...rest } = item;
  return {
    ...rest,
    project_id: currentProject,
    updated_at: new Date().toISOString(),
  };
};

export const checkAndSetDefaults = (item: StoryType) => {
  const checkedPriority = item.priority === "" ? "icebox" : item.priority;
  const checkedStatus = item.status === "" ? "draft" : item.status;
  const checkedStorypoints =
    item.storypoints === "" ? "none" : item.storypoints;
  return {
    ...item,
    priority: checkedPriority,
    storypoints: checkedStorypoints,
    status: checkedStatus,
  };
};
