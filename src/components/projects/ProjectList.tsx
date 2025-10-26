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
  const { getAllProjectsForUser } = useProject();

  useEffect(() => {
    (async () => {
      const res = await getAllProjectsForUser();
      setProjects(res || []);
    })();
  }, []);
  const pList = projects;

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle>Projektliste</CardTitle>
        <CardDescription>
          Die Liste zeigt alle Projekte an, an denen Sie beteiligt sind. Wählen
          Sie das Projekt aus, dass Sie aktiv bearbeiten möchten.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Auswahl</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Ziel</TableHead>
              <TableHead>Erstellungsdatum</TableHead>
              <TableHead>Product Owner</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pList.map((p) => (
              <TableRow key={p.id}>
                <TableCell>x</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.goal}</TableCell>
                <TableCell>{formatDateToEU(p.created_at)}</TableCell>
                <TableCell>{p.owner_id}</TableCell>
                <TableCell>{p.finished ? "abgeschlossen" : "offen"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProjectList;
