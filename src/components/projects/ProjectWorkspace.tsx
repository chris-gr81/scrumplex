import { useProject } from "@/contexts/ProjectContext";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect, useState, useCallback } from "react";
import type { ProjectListType, ProjectRow } from "@/schemas";
import { cn, formatDateToEU } from "@/lib/utils";
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
import { sortProjects } from "@/lib/sorts";
import { CircleCheck, CircleDashed } from "lucide-react";

export const ProjectList = () => {
  const [projects, setProjects] = useState<ProjectListType>([]);
  const { setActivePanel } = useDisplay();
  const {
    activeProject,
    getAllProjectsForUser,
    setCurrentProject,
    updateCurrentProjectInProfiles,
    updateProject,
  } = useProject();

  const loadProjects = useCallback(async () => {
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
        updated_at: r.updated_at,
      };
    });

    setProjects(sortProjects(projectsWithOwnerName) || []);
  }, [getAllProjectsForUser]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);
  const pList = projects;

  const handleRowClick = (current: ProjectRow) => {
    setCurrentProject(current);
    updateCurrentProjectInProfiles(current.id);
    toast["info"]("Aktives Projekt gewechselt");
  };

  const toggleStatus = () => {
    if (!activeProject) return;
    const row = projects.find((p) => p.id === activeProject.id);
    console.log(row);
    if (!row) return;
    const updatedRow = {
      ...row,
      finished: !row.finished,
      updated_at: new Date().toISOString(),
    };

    const newPList = projects.map((p) =>
      p.id === activeProject.id ? updatedRow : p
    );
    setProjects(sortProjects(newPList));

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
                  <FtabHead className="truncate basis-[35%]">Name</FtabHead>

                  <FtabHead className="truncate basis-[15%]">Erstellt</FtabHead>
                  <FtabHead className="truncate basis-[15%]">
                    Letzte Änderung
                  </FtabHead>
                  <FtabHead className="truncate basis-[20%]">
                    Product Owner
                  </FtabHead>
                  <FtabHead className="truncate basis-[15%]">Status</FtabHead>
                </FtabRow>
              </FtabHeader>
              <FtabBody>
                {pList.map((p) => {
                  const textDesign = p.finished
                    ? "line-through text-muted-foreground"
                    : "text-foreground";

                  return (
                    <FtabRow
                      className={cn(
                        p.id === activeProject?.id
                          ? "bg-muted-foreground/30 cursor-pointer hover:bg-muted-foreground/10"
                          : "cursor-pointer hover:bg-muted-foreground/10"
                      )}
                      key={p.id}
                      onClick={() => handleRowClick(p)}
                    >
                      <FtabCell
                        className={cn("truncate basis-[35%]", textDesign)}
                      >
                        {p.name}
                      </FtabCell>

                      <FtabCell
                        className={cn("truncate basis-[15%]", textDesign)}
                      >
                        {formatDateToEU(p.created_at, false)}
                      </FtabCell>
                      <FtabCell
                        className={cn("truncate basis-[15%]", textDesign)}
                      >
                        {formatDateToEU(p.updated_at, true)}
                      </FtabCell>
                      <FtabCell
                        className={cn("truncate basis-[20%]", textDesign)}
                      >
                        {p.ownerName}
                      </FtabCell>
                      <FtabCell
                        className={cn("truncate basis-[15%]", textDesign)}
                      >
                        {p.finished ? (
                          <div className="flex flex-row items-center gap-1">
                            <CircleDashed className="h-4" />
                            Inaktiv
                          </div>
                        ) : (
                          <div className="flex flex-row items-center gap-1">
                            <CircleCheck className="h-4 text-emerald-700" />
                            Aktiv
                          </div>
                        )}
                      </FtabCell>
                    </FtabRow>
                  );
                })}
              </FtabBody>
            </Ftab>
          </CardContent>
        </Card>
      </div>
      <div className="basis-1/3">
        <ProjectOverview
          project={activeProject}
          toggleStatus={toggleStatus}
          onDeleted={loadProjects}
        />
      </div>
    </div>
  );
};

export default ProjectList;
