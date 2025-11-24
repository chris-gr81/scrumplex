import { useProject } from "@/contexts/ProjectContext";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect, useState } from "react";
import type { ProjectListType } from "@/schemas";
import { formatDateToEU } from "@/lib/utils";
import { useDisplay } from "@/contexts/DisplayContext";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Ftab,
  FtabBody,
  FtabCell,
  FtabHead,
  FtabHeader,
  FtabRow,
} from "../ui/ftab";
import ProjectOverview from "./ProjectOverview";

export const ProjectList = () => {
  const [projects, setProjects] = useState<ProjectListType>([]);
  const { setActivePanel } = useDisplay();
  const {
    project,
    getAllProjectsForUser,
    setCurrentProject,
    updateCurrentProjectToDb,
    updateProject,
  } = useProject();
  const activeProjectData = projects.find((p) => p.id === project) || null;

  useEffect(() => {
    (async () => {
      const res: ProjectListType | any = await getAllProjectsForUser();
      if (!res) return;

      const projectsWithOwnerName = res.map((r: any) => {
        const member = r.project_members[0].profiles;
        const productOwnerName = `${member.first_name} ${member.last_name}`;
        return {
          id: r.id,
          name: r.name,
          goal: r.goal,
          created_at: r.created_at,
          finished: r.finished,
          owner_id: r.owner_id,
          ownerName: productOwnerName,
        };
      });

      setProjects(projectsWithOwnerName || []);
    })();
  }, []);
  const pList = projects;

  const handleRowClick = (projectId: string) => {
    setCurrentProject(projectId);
    updateCurrentProjectToDb(projectId);
    toast["info"]("Aktives Projekt gewechselt");
  };

  const toggleStatus = () => {
    const row = projects.find((p) => p.id === project);
    console.log(row);
    if (!row) return;
    const updatedRow = { ...row, finished: !row.finished };

    setProjects((prev) => prev.map((p) => (p.id === project ? updatedRow : p)));

    updateProject(updatedRow);
  };

  return (
    <div className="flex flex-row w-full gap-3">
      <div className="basis-2/3 min-w-0">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Projektliste</CardTitle>
            <CardDescription>
              Die Liste zeigt alle Projekte an, an denen Sie beteiligt sind. Das
              aktuelle Projekt ist hervorgehoben. Sie können ein anderes Projekt
              auswählen, indem Sie auf die entsprechende Zeile klicken.
            </CardDescription>
            <CardAction>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActivePanel({ type: "newProject" });
                }}
              >
                <span className="text-xs">Projekt anlegen</span>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Ftab>
              <FtabHeader>
                <FtabRow>
                  <FtabHead className="truncate basis-[50%]">Name</FtabHead>

                  <FtabHead className="truncate basis-[15%]">Angelegt</FtabHead>
                  <FtabHead className="truncate basis-[20%]">
                    Product Owner
                  </FtabHead>
                  <FtabHead className="truncate basis-[15%]">Status</FtabHead>
                </FtabRow>
              </FtabHeader>
              <FtabBody>
                {pList.map((p) => (
                  <FtabRow
                    className={
                      p.id === project
                        ? "bg-muted-foreground/30 cursor-pointer hover:bg-muted-foreground/10"
                        : "cursor-pointer hover:bg-muted-foreground/10 "
                    }
                    key={p.id}
                    onClick={() => handleRowClick(p.id)}
                  >
                    <FtabCell className="truncate basis-[50%]">
                      {p.name}
                    </FtabCell>

                    <FtabCell className="truncate basis-[15%]">
                      {formatDateToEU(p.created_at, false)}
                    </FtabCell>
                    <FtabCell className="truncate basis-[20%]">
                      {p.ownerName}
                    </FtabCell>
                    <FtabCell className="truncate basis-[15%]">
                      {p.finished ? "abgeschlossen" : "offen"}
                    </FtabCell>
                  </FtabRow>
                ))}
              </FtabBody>
            </Ftab>
          </CardContent>
        </Card>
      </div>
      <div className="basis-1/3">
        <ProjectOverview
          project={activeProjectData}
          toggleStatus={toggleStatus}
        />
      </div>
    </div>
  );
};

export default ProjectList;
