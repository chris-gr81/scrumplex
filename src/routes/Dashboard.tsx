import NewProject from "@/components/projects/NewProject";
import ProjectHeader from "@/components/projects/ProjectHeader";
import { useAuth } from "@/contexts/AuthContext";
import { useDisplay } from "@/contexts/DisplayContext";
import { useProject } from "@/contexts/ProjectContext";
import { useRouteToast } from "@/hooks/useRouteToast";
import { formatDateToEU } from "@/lib/utils";
import type { ProjectRow } from "@/schemas";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function Dashboard() {
  const { auth } = useAuth();
  const { project, getCurrentProject } = useProject();
  const { getActivePanel } = useDisplay();
  const [projectData, setProjectData] = useState<ProjectRow | null>(null);
  const { state } = useLocation();
  console.log("route state", state);

  useRouteToast();

  useEffect(() => {
    console.log("Current project in dashboard:", project);
    if (!project) return;
    (async () => {
      const res = await getCurrentProject(project);
      setProjectData(res);
    })();
  }, [project, getCurrentProject]);

  if (auth.status !== "ready") return null;

  const headerProbs = projectData
    ? {
        title: projectData.name,
        description: projectData.goal,
        date: formatDateToEU(projectData.created_at),
        isProject: true,
      }
    : {
        title: "Kein Projekt ausgewählt",
        description:
          "Bitte wählen Sie ein Projekt aus, oder legen Sie ein neues Projekt an.",
        date: "",
        isProject: false,
      };

  return (
    <div className="flex flex-col items-center gap-3">
      <ProjectHeader {...headerProbs} />
      {getActivePanel()}
    </div>
  );
}
