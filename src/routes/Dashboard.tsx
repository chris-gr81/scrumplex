import { useAuth } from "@/contexts/AuthContext";
import { useProject } from "@/contexts/ProjectContext";
import { useRouteToast } from "@/hooks/useRouteToast";
import type { ProjectRow } from "@/schemas";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function Dashboard() {
  const { auth } = useAuth();
  const { project, getCurrentProject } = useProject();
  const [projectData, setProjectData] = useState<ProjectRow | null>(null);
  const { state } = useLocation();
  console.log("route state", state);

  useRouteToast();

  useEffect(() => {
    if (!project) return;
    (async () => {
      const res = await getCurrentProject(project);
      setProjectData(res);
    })();
  }, [project, getCurrentProject]);

  if (auth.status !== "ready") return;

  if (projectData) {
    return (
      <div>
        <h2>Projectus habemus! </h2>
        <ul className="list-disc p-5">
          <li>Projektname: {projectData.name}</li>
          <li>Projektziel: {projectData.goal}</li>
          <li>Erstellt am: {projectData.created_at}</li>
          <li>Status: {projectData.finished ? "beendet" : "offen"}</li>
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold">Das wird einmal das Dashboard</h2>
      <p>Weil grad kein Projekt vorhanden ist, hier Zustandsdaten </p>
      <ul className="list-disc p-5">
        <li>Profile Vorname: {auth.profile.first_name}</li>
        <li>Profile Nachname: {auth.profile.last_name}</li>
        <li>Profile ID: {auth.profile.id}</li>
      </ul>
    </div>
  );
}
