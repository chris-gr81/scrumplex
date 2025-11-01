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

interface ProjectHeaderProps {
  title: string;
  description: string;
  date?: string;
  isProject: boolean;
}

export const ProjectHeader = (props: ProjectHeaderProps) => {
  const [isGoalVisible, setIsGoalVisible] = useState(false);
  const { title, description, date, isProject } = props;

  const toogleGoalVisibility = () => {
    setIsGoalVisible(!isGoalVisible);
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {isProject ? (
          // true-case: is a project
          <CardDescription>Angelegt am: {date ? date : ""}</CardDescription>
        ) : (
          // false-case: is not a project
          <CardDescription>{description}</CardDescription>
        )}

        <CardAction>
          {isProject ? (
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
      {isGoalVisible && isProject ? (
        <CardContent>
          <p className="font-normal text-sm text-muted-foreground">
            &bdquo;{description}&ldquo;
          </p>
        </CardContent>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ProjectHeader;
