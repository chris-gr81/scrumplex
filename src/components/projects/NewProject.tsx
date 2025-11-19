import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";

import MemberTable from "../MemberTable";
import { Button } from "../ui/button";
import { useState } from "react";
import { useProject } from "@/contexts/ProjectContext";
import { useAuth } from "@/contexts/AuthContext";
import { useDisplay } from "@/contexts/DisplayContext";
import { toast } from "sonner";
import { SquareX } from "lucide-react";

export default function NewProject() {
  const {
    project,
    createProject,
    createProjectMembers,
    setCurrentProject,
    updateCurrentProjectToDb,
  } = useProject();
  const { auth, roles } = useAuth();
  const [projectName, setProjectName] = useState("");
  const [projectGoal, setProjectGoal] = useState("");
  const { setActivePanel } = useDisplay();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth.status !== "ready") return;
    const resProject = await createProject({
      name: projectName,
      goal: projectGoal,
      finished: false,
    });

    if (!resProject.success) {
      return;
    }
    const projectId = resProject.data.id;
    const profileId = auth.profile.id;
    const roleId = roles?.find((r) => {
      return r.name === "Product Owner";
    })?.id;
    if (!roleId) return;

    const resProjectMembers = await createProjectMembers({
      project_id: projectId,
      profile_id: profileId,
      role_id: roleId,
    });

    if (resProjectMembers && resProject) {
      setCurrentProject(resProject.data.id);
      await updateCurrentProjectToDb(resProject.data.id);
      if (project) console.log("Sucess, here is the project", project);

      const message =
        'Das Projekt "' +
        resProject.data.name +
        '" wurde erfolgreich angelegt.';
      setActivePanel({ type: "projectList" });
      toast["success"](message);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Neues Projekt anlegen</CardTitle>
        <CardDescription>
          Geben Sie einen Projektnamen und das Projektziel (Product Goal) an.
          Sie werden als Product Owner gesetzt.
        </CardDescription>
        <CardAction>
          {" "}
          <SquareX
            className="cursor-pointer text-foreground/50 hover:text-foreground"
            onClick={() => {
              setActivePanel({ type: "projectList" });
            }}
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-row justify-center">
        <form
          id="new-project-form"
          className="w-full max-w-xl"
          onSubmit={handleSubmit}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="project-name">Projektname</FieldLabel>
              <Input
                id="project-name"
                name="project-name"
                placeholder="Projektname..."
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
              <FieldDescription>
                Wählen Sie einen aussagekräftigen Projektnamen.
              </FieldDescription>
              <FieldError></FieldError>
            </Field>
            <FieldSeparator />
            <Field>
              <FieldLabel htmlFor="product-goal">
                Projektziel (Product Goal)
              </FieldLabel>

              <Textarea
                id="product-goal"
                name="product-goal"
                placeholder="Wer soll was erreichen/ tun können, um welchen Nutzen zu erzielen..."
                rows={5}
                value={projectGoal}
                onChange={(e) => setProjectGoal(e.target.value)}
                required
              />
              <FieldDescription>
                Ein gutes Product-Goal beschreibt den gewünschten Nutzen oder
                Zustand, den das Produkt erreichen soll.
              </FieldDescription>
              <FieldError></FieldError>
            </Field>
            <FieldSeparator />
            <Field>
              <MemberTable />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {" "}
        <Button type="submit" form="new-project-form">
          Speichern
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setActivePanel({ type: "projectList" });
          }}
        >
          Verwerfen
        </Button>
      </CardFooter>
    </Card>
  );
}
