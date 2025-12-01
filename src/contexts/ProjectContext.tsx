import { supabase } from "@/lib/supabaseClient";
import { handleZodError, loadCurrentProject } from "@/lib/utils";
import {
  CurrentProjectSchema,
  NewProjectMemberSchema,
  NewProjectSchema,
  UpdateProjectSchema,
  type CurrentProjectType,
  type NewProjectMemberType,
  type ProjectRow,
  type StoryType,
} from "@/schemas";
import {
  useContext,
  useState,
  type ReactNode,
  createContext,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext";

export type ProjectPatch = Partial<
  Pick<ProjectRow, "name" | "goal" | "finished" | "updated_at">
>;
type ProjectResult = { success: true; data: ProjectRow } | { success: false };
type ProjectMembersResult =
  | { success: true; data: NewProjectMemberType }
  | { success: false };

type ProjectContextValue = {
  activeProject: ProjectRow | null;
  projects: ProjectRow[] | null;
  createProject: (patch: ProjectPatch) => Promise<ProjectResult>;
  createProjectMembers: (
    patch: NewProjectMemberType
  ) => Promise<ProjectMembersResult>; // TODO ;)
  setCurrentProject: (current: ProjectRow) => void;
  getCurrentProject: (
    currentId: CurrentProjectType
  ) => Promise<ProjectRow | null>;
  updateCurrentProjectInProfiles: (currentId: string) => Promise<void>;
  getAllProjectsForUser: () => any;
  insertNewStory: (story: any) => Promise<any>;
  updateStory: (story: any) => Promise<any>;
  fetchStoriesForProject: () => Promise<any>;
  updateProject: (patch: ProjectPatch) => Promise<ProjectResult>;
  isActiveProjectFinished: () => boolean;
};

const ProjectContext = createContext<ProjectContextValue | undefined>(
  undefined
);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [activeProject, setActiveProject] = useState<ProjectRow | null>(null);
  const [projects] = useState<ProjectRow[] | null>([]);
  const { auth } = useAuth();

  // initial loader
  useEffect(() => {
    if (auth.status !== "ready") return;
    (async () => {
      const current = await loadCurrentProject(auth.profile.id);
      if (!current) return;
      const row = await getCurrentProject(current.current_project);
      setActiveProject(row ? row : null);
    })();
  }, []);

  // updater vor current project in auth profile
  const updateCurrentProjectInProfiles = async (
    currentId: string
  ): Promise<void> => {
    console.log("Updating current project to db (try):", activeProject?.id);
    if (auth.status !== "ready") return;
    const { error } = await supabase
      .from("profiles")
      .update({ current_project: currentId })
      .eq("id", auth.profile.id);
    if (error) console.error("Updating current project to db error: ", error);
    console.log("Updating current project to db success");
  };

  const createProject = async (patch: ProjectPatch) => {
    const parseResult = NewProjectSchema.safeParse({
      name: (patch.name ?? "").toString().trim(),
      goal: (patch.goal ?? "").toString().trim(),
      finished: patch.finished,
      updated_at: new Date().toISOString(),
    });

    if (!parseResult.success) {
      handleZodError(parseResult.error);
      return { success: false } satisfies ProjectResult;
    }

    const payload = parseResult.data;
    const { data, error } = await supabase
      .from("projects")
      .insert(payload)
      .select()
      .single();

    if (error) return { success: false } satisfies ProjectResult;
    return { success: true, data };
  };

  const updateProject = async (patch: ProjectPatch) => {
    const parseResult = UpdateProjectSchema.safeParse({
      name: (patch.name ?? "").toString().trim(),
      goal: (patch.goal ?? "").toString().trim(),
      finished: patch.finished,
      updated_at: new Date().toISOString(),
    });

    if (!parseResult.success) {
      handleZodError(parseResult.error);
      return { success: false } satisfies ProjectResult;
    }

    const payload = parseResult.data;
    const { data, error } = await supabase
      .from("projects")
      .update(payload)
      .eq("id", activeProject?.id)
      .select()
      .single();
    if (error) return { success: false } satisfies ProjectResult;
    return { success: true, data };
  };

  const createProjectMembers = async (patch: NewProjectMemberType) => {
    const parseResult = NewProjectMemberSchema.safeParse({
      project_id: (patch.project_id ?? "").toString().trim(),
      profile_id: (patch.profile_id ?? "").toString().trim(),
      role_id: (patch.role_id ?? "").toString().trim(),
    });

    if (!parseResult.success) {
      handleZodError(parseResult.error);

      return { success: false } satisfies ProjectMembersResult;
    }

    const payload = parseResult.data;
    const { data, error } = await supabase
      .from("project_members")
      .insert(payload)
      .select()
      .single();

    if (error) return { success: false } satisfies ProjectMembersResult;
    return { success: true, data };
  };

  const setCurrentProject = (current: ProjectRow): void => {
    setActiveProject(current);
  };

  const getCurrentProject = async (
    currentId: CurrentProjectType
  ): Promise<ProjectRow | null> => {
    const res = CurrentProjectSchema.safeParse(currentId);
    if (!res.success) return null;
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", res.data)
      .single();

    if (error) {
      console.error("Reading Projects Error: ", error);
      return null;
    }
    console.log("Fetched current project data: ", data);
    return data;
  };

  const getAllProjectsForUser = async () => {
    if (auth.status !== "ready") return [];
    const { data, error } = await supabase
      .from("projects")
      .select("*, project_members(*, profiles(first_name, last_name))")
      .eq("project_members.profile_id", auth.profile.id)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Reading Projects by Owner Error: ", error);
      return [];
    }

    return data;
  };

  const insertNewStory = async (story: StoryType) => {
    if (auth.status !== "ready") return;
    const { invest, ...userstory } = story;
    const { data: storyData, error: storyError } = await supabase
      .from("userstories")
      .insert(userstory)
      .select("id")
      .single();

    if (storyError) {
      console.error("Insert userstory failed:", storyError);
      return;
    }
    if (!storyData?.id) return;

    console.log("Story inserted, new Id:", storyData.id);
    const { id, ...rest } = invest;
    const prepInvest = { ...rest, userstory_id: storyData.id };

    const { error: investError } = await supabase
      .from("invest")
      .insert(prepInvest)
      .select()
      .single();

    if (investError) console.error("Insert invest failed:", investError);
  };

  const updateStory = async (story: StoryType) => {
    if (auth.status !== "ready") return;
    const { invest, ...userstory } = story;
    const { error: errorUse } = await supabase
      .from("userstories")
      .update(userstory)
      .eq("id", userstory.id);
    if (errorUse) {
      console.error("Update userstory failed:", errorUse);
      return;
    }
    const { error: errorInv } = await supabase
      .from("invest")
      .update(invest)
      .eq("id", invest.id);
    if (errorInv) {
      console.error("Update invest failed:", errorInv);
      return;
    }
  };

  const fetchStoriesForProject = async () => {
    if (auth.status !== "ready") return;
    const { data, error } = await supabase
      .from("userstories")
      .select("*, invest(*)")
      .eq("project_id", activeProject?.id)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Fetch stories failed:", error);
      return [];
    }
    console.log(data);
    return data;
  };

  const isActiveProjectFinished = (): boolean => {
    return activeProject?.finished ?? false;
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activeProject,
        createProject,
        createProjectMembers,
        setCurrentProject,
        getCurrentProject,
        updateCurrentProjectInProfiles,
        getAllProjectsForUser,
        insertNewStory,
        fetchStoriesForProject,
        updateStory,
        updateProject,
        isActiveProjectFinished,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const ctx = useContext(ProjectContext);
  if (!ctx)
    throw new Error("useProject must be used within an ProjectProvider");
  return ctx;
}
