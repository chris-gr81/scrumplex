import type { ProjectRow } from "@/schemas";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useProject } from "@/contexts/ProjectContext";

export const ProjectHeader = ({ projectData }: ProjectRow) => {
  const { project } = useProject();
  console.log(projectData.name);
  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>{projectData.name}</CardHeader>
      <CardContent>
        <p>{projectData.id}</p>
        <p>{project}</p>
      </CardContent>
    </Card>
  );
};

export default ProjectHeader;
