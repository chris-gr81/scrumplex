import { useContext, useState, type ReactNode, createContext } from "react";

type ProjectContextValue = { project: any };

const ProjectContext = createContext<ProjectContextValue | undefined>(
  undefined
);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<any>(null);

  return (
    <ProjectContext.Provider value={{ project }}>
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
