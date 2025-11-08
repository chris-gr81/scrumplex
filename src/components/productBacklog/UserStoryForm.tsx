import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SquareX } from "lucide-react";
import { useDisplay } from "@/contexts/DisplayContext";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

interface UserStoryFormProps {
  edit: boolean;
}

export const UserStoryForm = (props: UserStoryFormProps) => {
  const { edit } = props;
  const { setActivePanel } = useDisplay();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Userstory {edit ? "bearbeiten" : "anlegen"}</CardTitle>
        <CardDescription>
          {edit
            ? "Änderungen an der ausgewählten Userstory werden nach dem Speichern aktiv."
            : "Hier können Sie eine neue Userstotry anlegen."}
        </CardDescription>
        <CardAction>
          <SquareX
            className="cursor-pointer text-foreground/50 hover:text-foreground"
            onClick={() => {
              setActivePanel({ type: "productBacklogList" });
            }}
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex">
        <FieldGroup className="pl-4 pr-4">
          <Field>
            <FieldLabel htmlFor="story-name">Story-Name</FieldLabel>
            <FieldDescription>
              Tragen Sie einen aussagekräftigen Namen ein.
            </FieldDescription>
            <Input name="story-name"></Input>
          </Field>
          <Field>
            <FieldLabel>Userstory</FieldLabel>
            <FieldDescription>
              Tragen Sie hier das Story-Statement ein.
            </FieldDescription>

            <FieldContent>
              <FieldLabel htmlFor="story-as">Als...</FieldLabel>
              <Textarea name="story-as" placeholder="..." />
              <FieldLabel htmlFor="story-like">möchte ich...</FieldLabel>
              <Textarea name="story-like" placeholder="..." />
              <FieldLabel htmlFor="story-cause">um...</FieldLabel>
              <Textarea name="story-cause" placeholder="..." />
            </FieldContent>
          </Field>
        </FieldGroup>
        <FieldGroup className="pl-4 pr-4">
          <Field>
            <FieldLabel>Metrik</FieldLabel>
            <FieldDescription>
              Bearbeiten Sie hier die Metriken ihrer Userstory.
            </FieldDescription>
            <FieldContent className="flex flex-row">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Storypoints" />
                  <SelectContent>
                    <SelectItem value="none">-</SelectItem>
                    <SelectItem value="trivial">1 - Trivial</SelectItem>
                    <SelectItem value="small">2 - Klein</SelectItem>
                    <SelectItem value="medium">3 - Mittel</SelectItem>
                    <SelectItem value="large">5 - Komplex</SelectItem>
                    <SelectItem value="xl">8 - Groß</SelectItem>
                    <SelectItem value="epic">13 - Epic</SelectItem>
                  </SelectContent>
                </SelectTrigger>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Priorität" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="must">Pflicht</SelectItem>
                  <SelectItem value="high">Hoch</SelectItem>
                  <SelectItem value="medium">Mittel</SelectItem>
                  <SelectItem value="low">Niedrig</SelectItem>
                  <SelectItem value="icebox">Icebox</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Entwurf</SelectItem>
                  <SelectItem value="refinement">Verfeinern</SelectItem>
                  <SelectItem value="ready">Sprint-Ready</SelectItem>
                  <SelectItem value="in-progress">Im Sprint</SelectItem>
                  <SelectItem value="done">Abgeschlossen</SelectItem>
                  <SelectItem value="discarded">Verworfen</SelectItem>
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>
          <FieldSet>
            <FieldLegend variant="label">Quality</FieldLegend>
            <FieldDescription>
              Bewerten Sie hier, welche INVEST-Kriterien Ihre Story erfüllt.
            </FieldDescription>
            <FieldGroup className="gap-1 font-normal text-foreground/50">
              <Field orientation="horizontal">
                <Checkbox id="independent" />
                <FieldLabel htmlFor="independent">
                  <span>
                    <span className="text-foreground">I</span>ndependent
                  </span>
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="negotiable" />
                <FieldLabel htmlFor="negotiable">
                  <span>
                    <span className="text-foreground">N</span>egotiable
                  </span>
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="valuable" />
                <FieldLabel htmlFor="valuable">
                  <span>
                    <span className="text-foreground">V</span>aluable
                  </span>
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="estimable" />
                <FieldLabel htmlFor="estimable">
                  <span>
                    <span className="text-foreground">E</span>stimable
                  </span>
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="small" />
                <FieldLabel htmlFor="small">
                  <span>
                    <span className="text-foreground">S</span>mall
                  </span>
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="testable" />
                <FieldLabel htmlFor="testable">
                  <span>
                    <span className="text-foreground">T</span>estable
                  </span>
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
        <FieldGroup>
          <Field>
            <FieldLabel>Definition of Done</FieldLabel>
            <FieldDescription>
              Definieren Sie hier bis zu 10 Erfüllungskriterien Ihrer Userstory.
            </FieldDescription>
            <FieldContent>
              <Input placeholder="1. Erfüllungskriterium"></Input>
              <Input placeholder="2. Erfüllungskriterium"></Input>
              <Input placeholder="3. Erfüllungskriterium"></Input>
              <Input placeholder="4. Erfüllungskriterium"></Input>
              <Input placeholder="5. Erfüllungskriterium"></Input>
              <Input placeholder="6. Erfüllungskriterium"></Input>
              <Input placeholder="7. Erfüllungskriterium"></Input>
              <Input placeholder="8. Erfüllungskriterium"></Input>
              <Input placeholder="9. Erfüllungskriterium"></Input>
              <Input placeholder="10. Erfüllungskriterium"></Input>
            </FieldContent>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Speichern</Button>
      </CardFooter>
    </Card>
  );
};

export default UserStoryForm;
