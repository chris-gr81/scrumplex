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
import { useProject } from "@/contexts/ProjectContext";
import { useDisplay } from "@/contexts/DisplayContext";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import DefinitionOfDoneList from "./DefinitionOfDoneList";
import { useState } from "react";
import { StoryDefault, StorySchema, type StoryType } from "@/schemas";
import { checkAndSetDefaults, prepareStoryForDB } from "@/lib/utils";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

interface UserStoryFormProps {
  edit: boolean;
  payload?: StoryType;
}

export const UserStoryForm = (props: UserStoryFormProps) => {
  const { edit, payload } = props;
  const { setActivePanel } = useDisplay();
  const [story, setStory] = useState<StoryType>(payload ?? StoryDefault);
  const [dod, setDod] = useState("");
  const { project, insertNewStory, updateStory } = useProject();

  console.log(payload);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStory((prev) => ({ ...prev, [name]: value }));
  };

  const handleFieldChange = (name: string, value: string) => {
    setStory((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: boolean) => {
    // generate xy_rate out of xy_checked
    const rate = name.split("_")[0] + "_rate";
    // setting to zero or hundred
    const rateValue = value ? 100 : 0;

    setStory((prev) => ({
      ...prev,
      invest: { ...prev.invest, [name]: value, [rate]: rateValue },
    }));
    console.log(story);
  };

  const handleDoDEntry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDod(value);
  };

  const handleDodClick = () => {
    if (!dod.trim()) return;

    setStory((prev) => ({
      ...prev,
      definition_of_done: [
        { definition: dod.trim(), done: false },
        ...(prev.definition_of_done || []),
      ],
    }));
    setDod("");
  };

  const handleDoDPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleDodClick();
    }
  };

  const handleSubmitNew = async () => {
    if (!project) return;

    const res = StorySchema.safeParse(checkAndSetDefaults(story));
    if (!res.success) {
      console.log(res.error);
      return;
    }
    const prepStory = prepareStoryForDB(res.data, project);

    try {
      const result = await insertNewStory(prepStory);
      console.log("Insert Story:", result);
      setActivePanel({ type: "productBacklogList" });
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  const handleSubmitUpdate = async () => {
    if (!project) return;
    story.updated_at = new Date().toISOString();

    const res = StorySchema.safeParse(story);
    if (!res.success) {
      console.log(res.error);
      return;
    }
    try {
      const result = await updateStory(res.data);
      console.log("Upadate Story:", result);
      setActivePanel({ type: "productBacklogList" });
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

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
            <FieldLabel htmlFor="name">Story-Name</FieldLabel>
            <FieldDescription>
              Tragen Sie einen aussagekräftigen Namen ein.
            </FieldDescription>
            <Input
              name="name"
              value={story.name}
              onChange={handleChange}
            ></Input>
          </Field>
          <Field>
            <FieldLabel>Userstory</FieldLabel>
            <FieldDescription>
              Tragen Sie hier das Story-Statement ein.
            </FieldDescription>

            <FieldContent>
              <FieldLabel htmlFor="story_as">Als...</FieldLabel>
              <Textarea
                name="story_as"
                value={story.story_as}
                placeholder="..."
                onChange={handleChange}
              />
              <FieldLabel htmlFor="story_like">möchte ich...</FieldLabel>
              <Textarea
                name="story_like"
                value={story.story_like}
                placeholder="..."
                onChange={handleChange}
              />
              <FieldLabel htmlFor="story_cause">um...</FieldLabel>
              <Textarea
                name="story_cause"
                value={story.story_cause}
                placeholder="..."
                onChange={handleChange}
              />
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
              <Select
                value={story.storypoints}
                onValueChange={(value) =>
                  handleFieldChange("storypoints", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="0 - Unbestimmt" />
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Storypoints</SelectLabel>
                      <SelectItem value="none">0 - Unbestimmt</SelectItem>
                      <SelectItem value="trivial">1 - Trivial</SelectItem>
                      <SelectItem value="small">2 - Klein</SelectItem>
                      <SelectItem value="medium">3 - Mittel</SelectItem>
                      <SelectItem value="large">5 - Komplex</SelectItem>
                      <SelectItem value="xl">8 - Groß</SelectItem>
                      <SelectItem value="epic">13 - Epic</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </SelectTrigger>
              </Select>
              <Select
                value={story.priority}
                onValueChange={(value) => handleFieldChange("priority", value)}
              >
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
              <Select
                value={story.status}
                onValueChange={(value) => handleFieldChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Entwurf</SelectItem>
                  <SelectItem value="refinement">Verfeinern</SelectItem>
                  <SelectItem value="ready">Sprint-Ready</SelectItem>
                  <SelectItem value="progress">Im Sprint</SelectItem>
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
                <Checkbox
                  name="independent_check"
                  id="independent"
                  checked={story.invest.independent_check}
                  onCheckedChange={(value: boolean) =>
                    handleCheckboxChange("independent_check", value)
                  }
                />
                <FieldLabel htmlFor="independent">
                  <span>
                    <span className="text-foreground">I</span>ndependent
                  </span>
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  name="negotiable_check"
                  id="negotiable"
                  checked={story.invest.negotiable_check}
                  onCheckedChange={(value: boolean) =>
                    handleCheckboxChange("negotiable_check", value)
                  }
                />
                <FieldLabel htmlFor="negotiable">
                  <span>
                    <span className="text-foreground">N</span>egotiable
                  </span>
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  name="valuable_check"
                  id="valuable"
                  checked={story.invest.valuable_check}
                  onCheckedChange={(value: boolean) =>
                    handleCheckboxChange("valuable_check", value)
                  }
                />
                <FieldLabel htmlFor="valuable">
                  <span>
                    <span className="text-foreground">V</span>aluable
                  </span>
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  name="estimable_check"
                  id="estimable"
                  checked={story.invest.estimable_check}
                  onCheckedChange={(value: boolean) =>
                    handleCheckboxChange("estimable_check", value)
                  }
                />
                <FieldLabel htmlFor="estimable">
                  <span>
                    <span className="text-foreground">E</span>stimable
                  </span>
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  name="small_check"
                  id="small"
                  checked={story.invest.small_check}
                  onCheckedChange={(value: boolean) =>
                    handleCheckboxChange("small_check", value)
                  }
                />
                <FieldLabel htmlFor="small">
                  <span>
                    <span className="text-foreground">S</span>mall
                  </span>
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  name="testable_check"
                  id="testable"
                  checked={story.invest.testable_check}
                  onCheckedChange={(value: boolean) =>
                    handleCheckboxChange("testable_check", value)
                  }
                />
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
              Definieren Sie hier die Erfüllungskriterien Ihrer Userstory.
            </FieldDescription>
            <FieldContent>
              <div className="flex flex-row gap-4 items-center justify-center ">
                <Input
                  name="dod"
                  value={dod}
                  placeholder="Erfüllungskriterium eintragen"
                  onChange={handleDoDEntry}
                  onKeyDown={handleDoDPressEnter}
                ></Input>
              </div>
              <DefinitionOfDoneList story={story} setStory={setStory} />
            </FieldContent>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button onClick={story.id ? handleSubmitUpdate : handleSubmitNew}>
          Speichern
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setActivePanel({ type: "productBacklogList" });
          }}
        >
          Verwerfen
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserStoryForm;
