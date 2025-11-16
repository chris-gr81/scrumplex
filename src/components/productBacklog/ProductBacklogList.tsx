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
import { cn, averageInvest, formatDateToEU } from "@/lib/utils";
import {
  priorityMap,
  statusMap,
  storypointMap,
  translateMetrics,
} from "@/lib/translations";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";

import { useDisplay } from "@/contexts/DisplayContext";
import { useProject } from "@/contexts/ProjectContext";
import { type StoryType } from "@/schemas";
import { sortStories } from "@/lib/sorts";

export const ProductBacklogList = () => {
  const { setActivePanel } = useDisplay();
  const { fetchStoriesForProject } = useProject();
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
  const [isAllOpen, setIsAllOpen] = useState(false);
  const [stories, setStories] = useState<StoryType[] | []>([]);

  useEffect(() => {
    (async () => {
      const res = await fetchStoriesForProject();
      setStories(sortStories(res));
    })();
  }, []);

  useEffect(() => {
    if (!stories.length) return;
    const initialState = Object.fromEntries(
      stories.map((story) => [story.id, false])
    );
    setOpenRows(initialState);
  }, [stories]);

  const toggleAllRowExpansion = () => {
    const rowsArray = Object.entries(openRows);
    const newRows = rowsArray.map(([key]) => {
      return [key, !isAllOpen];
    });
    setOpenRows(Object.fromEntries(newRows));

    setIsAllOpen(!isAllOpen);
    console.log(stories);
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
              <FtabHead className="truncate basis-[30%]">Story-Name</FtabHead>
              <FtabHead className="truncate basis-[10%]">Erstellt:</FtabHead>
              <FtabHead className="truncate basis-[10%]">
                Letztes Update:
              </FtabHead>
              <FtabHead className="truncate basis-[10%]">INVEST</FtabHead>
              <FtabHead className="truncate basis-[10%]">Storypoints</FtabHead>
              <FtabHead className="truncate basis-[10%]">Priorität</FtabHead>
              <FtabHead className="truncate basis-[10%]">Status</FtabHead>
              <FtabHead className="truncate basis-[5%]"></FtabHead>
            </FtabRow>
          </FtabHeader>
          <FtabBody>
            {stories.map((story) => {
              const isInactive =
                story.status === "done" || story.status === "discarded"
                  ? true
                  : false;
              return (
                <FtabRow
                  key={story.id}
                  data-row-id={story.id}
                  subRow={
                    openRows[story.id] ? (
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
                              {story.story_as}{" "}
                              <span className="font-semibold">möchte ich</span>{" "}
                              {story.story_like},{" "}
                            </p>
                            <p>
                              <span className="font-semibold">um</span>{" "}
                              {story.story_cause}
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
                              {story.definition_of_done.map((dod) => {
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
                      data-toggle-id={story.id}
                      className={cn(
                        "h-4 w-4 cursor-pointer text-foreground/50 hover:text-foreground transition-transform duration-200",
                        openRows[story.id] && "rotate-90"
                      )}
                      onClick={toggleRowExpansion}
                    />
                  </FtabCell>
                  <FtabCell
                    className={cn(
                      "truncate basis-[30%]",
                      isInactive ? "text-foreground/30 line-through" : null
                    )}
                  >
                    {story.name}
                  </FtabCell>
                  <FtabCell
                    className={cn(
                      "truncate basis-[10%]",
                      isInactive ? "text-foreground/30 line-through" : null
                    )}
                  >
                    {formatDateToEU(story.created_at, false)}
                  </FtabCell>
                  <FtabCell
                    className={cn(
                      "truncate basis-[10%]",
                      isInactive ? "text-foreground/30 line-through" : null
                    )}
                  >
                    {formatDateToEU(story.updated_at, true)}
                  </FtabCell>
                  <FtabCell
                    className={cn(
                      "truncate basis-[10%]",
                      isInactive ? "text-foreground/30 line-through" : null
                    )}
                  >
                    {`${averageInvest(story.invest)} %`}
                  </FtabCell>
                  <FtabCell
                    className={cn(
                      "truncate basis-[10%]",
                      isInactive ? "text-foreground/30 line-through" : null
                    )}
                  >
                    {story.storypoints
                      ? translateMetrics(story.storypoints, storypointMap)
                      : ""}
                  </FtabCell>
                  <FtabCell
                    className={cn(
                      "truncate basis-[10%]",
                      isInactive ? "text-foreground/30 line-through" : null
                    )}
                  >
                    {story.priority
                      ? translateMetrics(story.priority, priorityMap)
                      : ""}
                  </FtabCell>
                  <FtabCell
                    className={cn(
                      "truncate basis-[10%]",
                      isInactive ? "text-foreground/30 line-through" : null
                    )}
                  >
                    {story.status
                      ? translateMetrics(story.status, statusMap)
                      : ""}
                  </FtabCell>
                  <FtabCell className="truncate basis-[5%]">
                    <Pencil
                      onClick={() => {
                        setActivePanel({
                          type: "userStory",
                          isEdit: true,
                          payload: story,
                        });
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
