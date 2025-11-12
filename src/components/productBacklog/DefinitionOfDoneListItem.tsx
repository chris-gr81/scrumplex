import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Pencil, Trash2 } from "lucide-react";
import { useOnClickOutside } from "usehooks-ts";
import { useRef, useState } from "react";
import type { DodItemType } from "@/schemas";

interface DodItemProps {
  index: number;
  item: any;
  openMode: any;
  updateDodList: (
    index: number,
    dodItem: DodItemType,
    cleanup: boolean
  ) => void;
}

export function DefinitionOfDoneListItem({ props }: { props: DodItemProps }) {
  const { item, index, updateDodList } = props;
  const cacheRef = useRef(item.definition);
  const [isOpen, setIsOpen] = useState(false);
  // listener for clicking outside open Input Element
  const inputRef = useRef<HTMLInputElement | null>(null);
  useOnClickOutside(inputRef as React.RefObject<HTMLElement>, () => {
    const restored = { ...item, definition: cacheRef.current, done: false };
    updateDodList(index, restored, false);
    setIsOpen(false);
  });

  const handleToggel = () => {
    const updated = { ...item, done: !item.done };
    updateDodList(index, updated, false);
    // updateDodItem(index, updated, false);
  };

  const deleteDodItem = () => {
    const updated = { ...item, definition: "", done: false };
    updateDodList(index, updated, true);
    // updateDodItem(index, updated, true);
  };

  const toggleEdit = () => {
    cacheRef.current = item.definition;
    setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = { ...item, definition: e.target.value };
    updateDodList(index, updated, false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        if (item.definition.trim() === "") {
          const cleaned = { ...item, definition: "", done: false };
          updateDodList(index, cleaned, true);
        } else {
          cacheRef.current = item.definition;
        }
        setIsOpen(false);

        break;
      case "Escape":
        const restored = { ...item, definition: cacheRef.current, done: false };
        updateDodList(index, restored, false);
        setIsOpen(false);
        break;
    }
  };
  return (
    <div
      key={index}
      className="flex flex-row pl-2 mr-2 text-foreground font-normal justify-between"
    >
      {!isOpen ? (
        <>
          <div
            className={cn(
              "cursor-pointer",
              item.done
                ? "text-decoration-line: line-through text-muted-foreground"
                : ""
            )}
            onClick={() => handleToggel()}
          >
            {item.definition}
          </div>
          <div className="flex gap-4 items-center">
            {item.done ? null : (
              <Pencil
                className="h-4 w-4 cursor-pointer text-foreground/50 hover:text-foreground"
                onClick={toggleEdit}
              />
            )}

            <Trash2
              className="h-4 w-4 cursor-pointer text-foreground/50 hover:text-foreground"
              onClick={() => {
                deleteDodItem();
              }}
            />
          </div>
        </>
      ) : (
        <Input
          ref={inputRef}
          className="m-4"
          autoFocus
          value={item.definition}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
      )}
    </div>
  );
}

export default DefinitionOfDoneListItem;
