import { supabase } from "@/lib/supabaseClient";
import {
  NewProjectMemberSchema,
  NewProjectSchema,
  type NewProjectMemberType,
  type ProjectMembersRow,
  type ProjectRow,
} from "@/schemas";
import { useContext, useState, type ReactNode, createContext } from "react";

export type ProjectPatch = Partial<
  Pick<ProjectRow, "name" | "goal" | "finished">
>;

type ProjectContextValue = {
  project: any;
  createProject: (patch: ProjectPatch) => Promise<ProjectRow>;
  createProjectMembers: (
    patch: NewProjectMemberType
  ) => Promise<ProjectMembersRow>; // TODO ;)
};

const ProjectContext = createContext<ProjectContextValue | undefined>(
  undefined
);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<any>(null);

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

  return (
    <ProjectContext.Provider
      value={{ project, createProject, createProjectMembers }}
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
