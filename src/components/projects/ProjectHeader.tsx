import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import type { ProjectRow } from "@/schemas";
import { formatDateToEU } from "@/lib/utils";

interface ProjectHeaderProps {
  activeProject: ProjectRow | null;
}

export const ProjectHeader = ({ activeProject }: ProjectHeaderProps) => {
  const [isGoalVisible, setIsGoalVisible] = useState(false);
  console.log("Active project in header:", activeProject);

  const toogleGoalVisibility = () => {
    setIsGoalVisible(!isGoalVisible);
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {activeProject?.name
            ? activeProject.name
            : "Kein aktives Projekt ausgwehält"}
        </CardTitle>

        <CardDescription>
          {activeProject
            ? `Angelegt am: ${formatDateToEU(
                activeProject.created_at ?? "",
                false
              )}`
            : "Bitte wählen Sie ein Projekt aus, oder legen Sie ein neues Projekt an"}
        </CardDescription>

        <CardAction>
          {activeProject ? (
            // true-case: is a project
            <Button variant="outline" size="sm" onClick={toogleGoalVisibility}>
              <span className="text-xs">
                {isGoalVisible
                  ? "Projektziel verbergen"
                  : "Projektziel anzeigen"}
              </span>
            </Button>
          ) : // false-case: is not a project
          null}
        </CardAction>
      </CardHeader>
      {isGoalVisible && activeProject ? (
        <CardContent>
          <p className="font-normal text-sm text-muted-foreground">
            &bdquo;{activeProject?.goal ?? ""}&ldquo;
          </p>
        </CardContent>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ProjectHeader;
