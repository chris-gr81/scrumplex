import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  Ftab,
  FtabBody,
  FtabCell,
  FtabHead,
  FtabHeader,
  FtabRow,
} from "../ui/ftab";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { mockStories } from "@/mocks/stories"; // mock data

export const ProductBacklogList = () => {
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
  const [isAllOpen, setIsAllOpen] = useState(false);

  useEffect(() => {
    const initialState = mockStories.reduce((acc, story) => {
      acc[story.id] = false;
      return acc;
    }, {} as Record<string, boolean>);
    setOpenRows(initialState);
  }, []);

  const toggleAllRowExpansion = () => {
    const rowsArray = Object.entries(openRows);
    const newRows = rowsArray.map(([key]) => {
      return [key, !isAllOpen];
    });
    setOpenRows(Object.fromEntries(newRows));

    setIsAllOpen(!isAllOpen);
  };

  const toggleRowExpansion = (e: React.MouseEvent<SVGSVGElement>) => {
    const targetId = e.currentTarget.dataset.toggleId;
    if (targetId) {
      setOpenRows((prev) => ({ ...prev, [targetId]: !prev[targetId] }));
    }
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Product Backlog</CardTitle>
        <CardDescription>
          Das Product Backlog listet alle Userstories auf. Die einzelnen
          Elemente könne vom Product Owner bearbeitet und prioriest werden.
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            <span className="text-xs">Story anlegen</span>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Ftab>
          <FtabHeader>
            <FtabRow>
              <FtabHead className="truncate basis-[5%]">
                <ChevronRight
                  onClick={toggleAllRowExpansion}
                  className={cn(
                    "cursor-pointer text-foreground/50 hover:text-foreground transition-transform duration-200",
                    isAllOpen && "rotate-90"
                  )}
                />
              </FtabHead>
              <FtabHead className="truncate basis-[40%]">Story-Name</FtabHead>
              <FtabHead className="truncate basis-[11%]">Erstellt am:</FtabHead>
              <FtabHead className="truncate basis-[11%]">INVEST in %</FtabHead>
              <FtabHead className="truncate basis-[11%]">Storypoints</FtabHead>
              <FtabHead className="truncate basis-[11%]">Priorität</FtabHead>
              <FtabHead className="truncate basis-[11%]">Status</FtabHead>
            </FtabRow>
          </FtabHeader>
          <FtabBody>
            {mockStories.map((storie) => {
              return (
                <FtabRow
                  key={storie.id}
                  data-row-id={storie.id}
                  subRow={
                    openRows[storie.id] ? (
                      <>
                        <p>
                          Als {storie.story_as} möchte ich {storie.story_like},
                          weil {storie.story_cause}.
                        </p>
                        <p>Definition of done: {storie.definition_of_done}</p>
                      </>
                    ) : undefined
                  }
                >
                  <FtabCell className="truncate basis-[5%]">
                    <ChevronRight
                      data-toggle-id={storie.id}
                      className={cn(
                        "h-4 w-4 cursor-pointer text-foreground/50 hover:text-foreground transition-transform duration-200",
                        openRows[storie.id] && "rotate-90"
                      )}
                      onClick={toggleRowExpansion}
                    />
                  </FtabCell>
                  <FtabCell className="truncate basis-[40%]">
                    {storie.name}
                  </FtabCell>
                  <FtabCell className="truncate basis-[11%]">
                    {storie.created_at}
                  </FtabCell>
                  <FtabCell className="truncate basis-[11%]">
                    {storie.invest}
                  </FtabCell>
                  <FtabCell className="truncate basis-[11%]">
                    {storie.storypoints}
                  </FtabCell>
                  <FtabCell className="truncate basis-[11%]">
                    {storie.priority}
                  </FtabCell>
                  <FtabCell className="truncate basis-[11%]">
                    {storie.status}
                  </FtabCell>
                </FtabRow>
              );
            })}
          </FtabBody>
        </Ftab>
      </CardContent>
    </Card>
  );
};

export default ProductBacklogList;
