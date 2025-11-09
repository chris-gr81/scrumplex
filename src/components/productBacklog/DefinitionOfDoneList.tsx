import { type StoryType } from "@/schemas";
interface DodPropsType {
  story: StoryType;
  setStory: React.Dispatch<React.SetStateAction<StoryType>>;
}

const DefinitionOfDoneList = ({ story, setStory }: DodPropsType) => {
  return (
    <ul>
      {story.definition_of_done.map((item, index) => (
        <li key={index}>
          {item.definition} {item.done ? "(erledigt)" : "(offen)"}
        </li>
      ))}
    </ul>
  );
};

export default DefinitionOfDoneList;
