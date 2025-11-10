import { Pencil, Trash2 } from "lucide-react";
import { type StoryType } from "@/schemas";
import { cn } from "@/lib/utils";
interface DodPropsType {
  story: StoryType;
  setStory: React.Dispatch<React.SetStateAction<StoryType>>;
}

const DefinitionOfDoneList = ({ story, setStory }: DodPropsType) => {
  const toggleDone = (index: number) => {
    setStory((prev) => {
      const newDod = [...prev.definition_of_done];
      const toggledItem = { ...newDod[index], done: !newDod[index].done };
      newDod[index] = toggledItem;
      return { ...prev, definition_of_done: newDod };
    });
  };
  return (
    <div className="mt-4 mr-2 text-sm font-medium">
      <p className="mb-2">Liste der Erfüllungskriterien</p>
      <p className="mb-4 text-muted-foreground font-normal">
        Durch klick in den Text können die Elemente als offen oder erledigt
        markiert werden.
      </p>
      {story.definition_of_done.map((item, index) => (
        <div
          key={index}
          className="flex flex-row pl-2 text-foreground font-normal justify-between"
        >
          <div
            className={cn(
              "cursor-pointer",
              item.done
                ? "text-decoration-line: line-through text-muted-foreground"
                : ""
            )}
            onClick={() => toggleDone(index)}
          >
            {item.definition}
          </div>
          <div className="flex gap-4 items-center">
            <Pencil className="h-4 w-4 cursor-pointer text-foreground/50 hover:text-foreground" />
            <Trash2 className="h-4 w-4 cursor-pointer text-foreground/50 hover:text-foreground" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DefinitionOfDoneList;
