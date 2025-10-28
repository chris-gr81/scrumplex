import { SquareX } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
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

export const ProjectList = () => {
  const [projects, setProjects] = useState<ProjectListType>([]);
  const { setActivePanel } = useDisplay();
  const {
    project,
    getAllProjectsForUser,

    setCurrentProject,
  } = useProject();

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
    toast["info"]("Aktives Projekt gewechselt");
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle>Projektliste</CardTitle>
        <CardDescription>
          Die Liste zeigt alle Projekte an, an denen Sie beteiligt sind. Das
          aktuelle Projekt ist hervorgehoben. Sie können ein anderes Projekt
          auswählen, indem Sie auf die entsprechende Zeile klicken.
        </CardDescription>
        <CardAction>
          <SquareX
            className="cursor-pointer text-foreground/50 hover:text-foreground"
            onClick={() => setActivePanel("empty")}
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="truncate w-3/10">Name</TableHead>
              <TableHead className="truncate w-3/10">Ziel</TableHead>
              <TableHead className="truncate w-1/10">Angelegt</TableHead>
              <TableHead className="truncate w-2/10">Product Owner</TableHead>
              <TableHead className="truncate w-1/10">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pList.map((p) => (
              <TableRow
                className={
                  p.id === project
                    ? "bg-muted-foreground/30 cursor-pointer hover:bg-muted-foreground/10"
                    : "cursor-pointer hover:bg-muted-foreground/10 "
                }
                key={p.id}
                onClick={() => handleRowClick(p.id)}
              >
                <TableCell className="truncate w-3/10">{p.name}</TableCell>
                <TableCell className="truncate max-w-3/10">{p.goal}</TableCell>
                <TableCell className="truncate w-1/10">
                  {formatDateToEU(p.created_at)}
                </TableCell>
                <TableCell className="truncate w-2/10">{p.ownerName}</TableCell>
                <TableCell className="truncate w-1/10">
                  {p.finished ? "abgeschlossen" : "offen"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProjectList;
