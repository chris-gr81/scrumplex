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

export default function NewProject() {
  return (
    <div className="flex flex-row justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Neues Projekt anlegen</CardTitle>
          <CardDescription>
            Geben Sie einen Projektnamen und das Projektziel (Product Goal) an.
            Sie werden als Product Owner gesetzt.
          </CardDescription>
          <CardAction>Irgendwas</CardAction>
        </CardHeader>
        <CardContent className="flex flex-row justify-center">
          <Form className="w-full max-w-xl">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="project-name">Projektname</FieldLabel>
                <Input
                  id="project-name"
                  name="project-name"
                  placeholder="Projektname..."
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
                  required
                />
                <FieldDescription>
                  Ein gutes Product-Goal beschreibt den gewünschten Nutzen oder
                  Zustand, den das Produkt erreichen soll.
                </FieldDescription>
                <FieldError></FieldError>
              </Field>
            </FieldGroup>
          </Form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
