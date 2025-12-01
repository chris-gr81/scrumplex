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
import { CircleCheck, RefreshCcw, Trash2 } from "lucide-react";

interface ProjectOverviewProps {
  project: ProjectListItem | null;
  toggleStatus: () => void;
}

export const ProjectOverview = ({
  project,
  toggleStatus,
}: ProjectOverviewProps) => {
  const { setActivePanel } = useDisplay();

  const handleToggle = () => {
    toggleStatus();
  };
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
          <CardFooter className="flex-row justify-end gap-2">
            <div onClick={handleToggle}>
              <Button variant="ghost" size="sm" className="text-xs">
                {project.finished ? <RefreshCcw /> : <CircleCheck />}
                <span>
                  {project.finished
                    ? "Projekt reaktivieren"
                    : "Projekt abschließen"}
                </span>
              </Button>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              <Trash2 />
              <span>Löschen</span>
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default ProjectOverview;
