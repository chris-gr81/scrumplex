import ProjectHeader from "@/components/projects/ProjectHeader";
import { useAuth } from "@/contexts/AuthContext";
import { useDisplay } from "@/contexts/DisplayContext";
import { useProject } from "@/contexts/ProjectContext";
import { useRouteToast } from "@/hooks/useRouteToast";
import { useLocation } from "react-router";

export default function Workspace() {
  const { auth } = useAuth();
  const { activeProject } = useProject();
  const { getActivePanel } = useDisplay();

  const { state } = useLocation();
  console.log("route state", state);

  useRouteToast();

  if (auth.status !== "ready") return null;

  return (
    <div className="flex flex-col items-center gap-3">
      <ProjectHeader activeProject={activeProject} />
      {getActivePanel()}
    </div>
  );
}
