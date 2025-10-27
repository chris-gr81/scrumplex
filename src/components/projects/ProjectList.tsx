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
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect, useState } from "react";
import type { ProjectListType } from "@/schemas";
import { formatDateToEU } from "@/lib/utils";

export const ProjectList = () => {
  const [projects, setProjects] = useState<ProjectListType>([]);
  const {
    project,
    getAllProjectsForUser,
    getProjectOwnerName,
    setCurrentProject,
  } = useProject();

  useEffect(() => {
    (async () => {
      const res: ProjectListType = await getAllProjectsForUser();
      if (!res) return;

      const projectsWithOwnerName = await Promise.all(
        res.map(async (r) => {
          const ownerName = await getProjectOwnerName(r.id, r.owner_id);
          return { ...r, ownerName };
        })
      );
      setProjects(projectsWithOwnerName || []);
    })();
  }, []);
  const pList = projects;

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle>Projektliste</CardTitle>
        <CardDescription>
          Die Liste zeigt alle Projekte an, an denen Sie beteiligt sind. Das
          aktuelle Projekt ist hervorgehoben. Sie können ein anderes Projekt
          auswählen, indem Sie auf die entsprechende Zeile klicken.
        </CardDescription>
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
                onClick={() => setCurrentProject(p.id)}
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
