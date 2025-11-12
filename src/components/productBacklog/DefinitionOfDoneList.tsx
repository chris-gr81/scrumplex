import { Pencil, Trash2 } from "lucide-react";
import { type DodItemType, type StoryType } from "@/schemas";
import { cn, dodCleanUp } from "@/lib/utils";
import { useState } from "react";
import { Input } from "../ui/input";
import DefinitionOfDoneListItem from "./DefinitionOfDoneListItem";
interface DodPropsType {
  story: StoryType;
  setStory: React.Dispatch<React.SetStateAction<StoryType>>;
}

const DefinitionOfDoneList = ({ story, setStory }: DodPropsType) => {
  const [openMode, setOpenMode] = useState(-1);

  // callback updater for DefinitionOfDoneListItem
  const updateDodList = (
    index: number,
    dodItem: DodItemType,
    cleanup: boolean
  ) => {
    setStory((prev) => {
      const newList = [...prev.definition_of_done];
      console.log(index, dodItem);
      newList[index] = dodItem;
      const finalList = cleanup ? dodCleanUp(newList) : newList;

      return { ...prev, definition_of_done: finalList };
    });
  };

  const enableDodModify = (index: number) => {
    setOpenMode(index);
  };
  const handleDodModifyPressEnter = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setOpenMode(-1);
    }
  };
  const handleDodModifyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    setStory((prev) => {
      const newDod = [...prev.definition_of_done];
      const modItem = { ...newDod[index], definition: value };
      newDod[index] = modItem;
      return { ...prev, definition_of_done: newDod };
    });
  };

  const deleteDodItem = (index: number) => {
    setStory((prev) => {
      const newDod = [...prev.definition_of_done];
      const delItem = { ...newDod[index], definition: "", done: false };
      newDod[index] = delItem;
      const cleanedDod = dodCleanUp(newDod);
      return { ...prev, definition_of_done: cleanedDod };
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
        <DefinitionOfDoneListItem
          props={{ item, index, openMode, updateDodList }}
          key={index}
        />
        /*<div
          key={index}
          className="flex flex-row pl-2 mr-2 text-foreground font-normal justify-between"
        >
          {index !== openMode ? (
            <>
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
                {item.done ? null : (
                  <Pencil
                    className="h-4 w-4 cursor-pointer text-foreground/50 hover:text-foreground"
                    onClick={() => {
                      enableDodModify(index);
                    }}
                  />
                )}

                <Trash2
                  className="h-4 w-4 cursor-pointer text-foreground/50 hover:text-foreground"
                  onClick={() => {
                    deleteDodItem(index);
                  }}
                />
              </div>
            </>
          ) : (
            <Input
              className="m-4"
              autoFocus
              value={item.definition}
              onKeyDown={handleDodModifyPressEnter}
              onChange={(e) => {
                handleDodModifyChange(e, index);
              }}
            />
          )}
        </div>*/
      ))}
    </div>
  );
};

export default DefinitionOfDoneList;
