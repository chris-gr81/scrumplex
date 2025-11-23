import { Button } from "../ui/button";
import { useDisplay } from "@/contexts/DisplayContext";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { type ProjectListItem } from "@/schemas";

interface ProjectOverviewProps {
  project: ProjectListItem | null;
}

export const ProjectOverview = ({ project }: ProjectOverviewProps) => {
  const { setActivePanel } = useDisplay();

  return (
    <Card className="w-full">
      {!project ? (
        "Kein Projekt"
      ) : (
        <>
          <CardHeader>
            <CardTitle>Projektdetails</CardTitle>
            <CardDescription>
              Hier sehen Sie die Details zum ausgewählten Projekt.
            </CardDescription>
            <CardAction>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActivePanel({ type: "productBacklogList" })}
              >
                <span className="text-xs">Zum Backlog</span>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 ml-3 mr-3">
            <div className="text-sm font-bold">
              <div>Projektname: </div>
              <div className="text-muted-foreground font-normal">
                {project.name}
              </div>
            </div>
            <div className="text-sm text-foreground font-bold">
              <div>Projektziel:</div>{" "}
              <div className="text-muted-foreground font-normal">
                &bdquo;{project.goal}&ldquo;
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-row justify-end"></CardFooter>
        </>
      )}
    </Card>
  );
};

export default ProjectOverview;
