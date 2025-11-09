import { ChevronRight, Pencil } from "lucide-react";
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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";

import { useDisplay } from "@/contexts/DisplayContext";

export const ProductBacklogList = () => {
  const { setActivePanel } = useDisplay();
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
  const [isAllOpen, setIsAllOpen] = useState(false);
  const mocks = mockStories.stories;

  useEffect(() => {
    const initialState = mocks.reduce((acc, story) => {
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setActivePanel({ type: "userStory", isEdit: false });
            }}
          >
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
              <FtabHead className="truncate basis-[10%]">Erstellt am:</FtabHead>
              <FtabHead className="truncate basis-[10%]">INVEST in %</FtabHead>
              <FtabHead className="truncate basis-[10%]">Storypoints</FtabHead>
              <FtabHead className="truncate basis-[10%]">Priorität</FtabHead>
              <FtabHead className="truncate basis-[10%]">Status</FtabHead>
              <FtabHead className="truncate basis-[5%]"></FtabHead>
            </FtabRow>
          </FtabHeader>
          <FtabBody>
            {mocks.map((storie) => {
              return (
                <FtabRow
                  key={storie.id}
                  data-row-id={storie.id}
                  subRow={
                    openRows[storie.id] ? (
                      <div className="flex flex-row pb-2">
                        <div className="basis-[5%]"></div>
                        <ResizablePanelGroup
                          direction="horizontal"
                          className="basis-[95%] pr-2"
                        >
                          <ResizablePanel defaultSize={50}>
                            <p className="font-bold">Story:</p>
                            <p>
                              &bdquo;<span className="font-semibold">Als</span>{" "}
                              {storie.story_as}{" "}
                              <span className="font-semibold">möchte ich</span>{" "}
                              {storie.story_like},{" "}
                            </p>
                            <p>
                              <span className="font-semibold">weil</span>{" "}
                              {storie.story_cause}
                              .&ldquo;
                            </p>
                          </ResizablePanel>
                          <ResizableHandle />
                          <ResizablePanel
                            defaultSize={50}
                            className="pl-2 pr-2"
                          >
                            <p className="font-bold">Definition of done:</p>
                            <ul className="list-disc list-inside pl-2">
                              {storie.definition_of_done.map((dod) => {
                                return (
                                  <li>
                                    {dod.definition}{" "}
                                    {dod.done ? "(abgeschlossen)" : "(offen)"}
                                  </li>
                                );
                              })}
                            </ul>
                          </ResizablePanel>
                        </ResizablePanelGroup>
                      </div>
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
                  <FtabCell className="truncate basis-[10%]">
                    {storie.created_at}
                  </FtabCell>
                  <FtabCell className="truncate basis-[10%]">
                    {storie.invest}
                  </FtabCell>
                  <FtabCell className="truncate basis-[10%]">
                    {storie.storypoints}
                  </FtabCell>
                  <FtabCell className="truncate basis-[10%]">
                    {storie.priority}
                  </FtabCell>
                  <FtabCell className="truncate basis-[10%]">
                    {storie.status}
                  </FtabCell>
                  <FtabCell className="truncate basis-[5%]">
                    <Pencil
                      onClick={() => {
                        setActivePanel({ type: "userStory", isEdit: true });
                      }}
                      className="h-4 w-4 cursor-pointer text-foreground/50 hover:text-foreground"
                    />
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
