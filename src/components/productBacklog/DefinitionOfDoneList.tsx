import { type DodItemType, type StoryType } from "@/schemas";
import { dodCleanUp } from "@/lib/utils";
import DefinitionOfDoneListItem from "./DefinitionOfDoneListItem";
interface DodPropsType {
  story: StoryType;
  setStory: React.Dispatch<React.SetStateAction<StoryType>>;
}

const DefinitionOfDoneList = ({ story, setStory }: DodPropsType) => {
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

  return (
    <div className="mt-4 mr-2 text-sm font-medium">
      <p className="mb-2">Liste der Erfüllungskriterien</p>
      <p className="mb-4 text-muted-foreground font-normal">
        Durch klick in den Text können die Elemente als offen oder erledigt
        markiert werden.
      </p>
      {story.definition_of_done.map((item, index) => (
        <DefinitionOfDoneListItem
          props={{ item, index, updateDodList }}
          key={index}
        />
      ))}
    </div>
  );
};

export default DefinitionOfDoneList;
