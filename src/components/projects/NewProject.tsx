import { Form } from "react-router";
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

export default function NewProject() {
  const [projectName, setProjectName] = useState("");
  const [projectGoal, setProjectGoal] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(projectName, " - ", projectGoal);
  };

  return (
    <div className="flex flex-row justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Neues Projekt anlegen</CardTitle>
          <CardDescription>
            Geben Sie einen Projektnamen und das Projektziel (Product Goal) an.
            Sie werden als Product Owner gesetzt.
          </CardDescription>
          <CardAction>
            <Button type="submit" form="new-project-form">
              Projekt anlegen
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-row justify-center">
          <Form
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
          </Form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
