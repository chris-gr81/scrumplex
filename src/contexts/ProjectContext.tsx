import { supabase } from "@/lib/supabaseClient";
import { loadCurrentProject } from "@/lib/utils";
import {
  CurrentProjectSchema,
  NewProjectMemberSchema,
  NewProjectSchema,
  type CurrentProjectType,
  type NewProjectMemberType,
  type ProjectMembersRow,
  type ProjectRow,
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
  Pick<ProjectRow, "name" | "goal" | "finished">
>;

type ProjectContextValue = {
  project: CurrentProjectType | null;
  createProject: (patch: ProjectPatch) => Promise<ProjectRow>;
  createProjectMembers: (
    patch: NewProjectMemberType
  ) => Promise<ProjectMembersRow>; // TODO ;)
  setCurrentProject: (projectId: CurrentProjectType) => void;
  getCurrentProject: (
    currentId: CurrentProjectType
  ) => Promise<ProjectRow | null>;
  updateCurrentProjectToDb: (currentId: string) => Promise<void>;
  getAllProjectsForUser: () => any;
};

const ProjectContext = createContext<ProjectContextValue | undefined>(
  undefined
);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<CurrentProjectType | null>(null);
  const { auth } = useAuth();

  // initial loader
  useEffect(() => {
    if (auth.status !== "ready") return;
    (async () => {
      const res = await loadCurrentProject(auth.profile.id);

      setProject(res ? res.current_project : null);
    })();
  }, []);

  // updater vor current project in auth profile
  const updateCurrentProjectToDb = async (currentId: string): Promise<void> => {
    console.log("Updating current project to db (try):", project);
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
    });

    if (!parseResult.success) {
      console.error("Validation error in createProject: ", parseResult.error);
      // TODO: Error handling
      return parseResult.error;
    }
    const payload = parseResult.data;
    const { data, error } = await supabase
      .from("projects")
      .insert(payload)
      .select()
      .single();

    if (error) return error;
    return data;
  };

  const createProjectMembers = async (patch: NewProjectMemberType) => {
    const parseResult = NewProjectMemberSchema.safeParse({
      project_id: (patch.project_id ?? "").toString().trim(),
      profile_id: (patch.profile_id ?? "").toString().trim(),
      role_id: (patch.role_id ?? "").toString().trim(),
    });

    if (!parseResult.success) {
      console.error(
        "Validation error in createProjectMember: ",
        parseResult.error
      );
      return parseResult.error;
    }
    const payload = parseResult.data;
    const { data, error } = await supabase
      .from("project_members")
      .insert(payload)
      .select()
      .single();

    if (error) return error;
    return data;
  };

  const setCurrentProject = (projectId: CurrentProjectType): void => {
    setProject(projectId);
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
      .select("*, project_members(*)")
      .eq("project_members.profile_id", auth.profile.id);

    if (error) {
      console.error("Reading Projects by Owner Error: ", error);
      return [];
    }
    return data;
  };

  return (
    <ProjectContext.Provider
      value={{
        project,
        createProject,
        createProjectMembers,
        setCurrentProject,
        getCurrentProject,
        updateCurrentProjectToDb,
        getAllProjectsForUser,
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
