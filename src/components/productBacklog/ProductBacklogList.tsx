import { ChevronRight, Pencil, CircleCheck, CircleDashed } from "lucide-react";
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
import { cn, averageInvest, formatDateToEU, cleanString } from "@/lib/utils";
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
  const { fetchStoriesForProject, updateStory } = useProject();
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

    setOpenRows((prev) => {
      const merged = { ...prev };

      for (const s of stories) {
        if (!(s.id in merged)) {
          merged[s.id] = false;
        }
      }

      return merged;
    });
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

  const handleInvestClick = (
    key: string,
    story: StoryType,
    isFullfilled: boolean
  ) => {
    console.log(key, isFullfilled);
    const newStory = {
      ...story,
      invest: { ...story.invest, [key]: !isFullfilled },
    };

    const newStories = stories.map((item) =>
      item.id === newStory.id ? newStory : item
    );
    setStories(newStories);
    updateStory(newStory);
  };

  const handleDodClick = (index: number, story: StoryType) => {
    const newDodList = story.definition_of_done.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    );

    const newStory = { ...story, definition_of_done: newDodList };

    setStories((prev) =>
      prev.map((s) => (s.id === newStory.id ? newStory : s))
    );

    updateStory(newStory);
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
                          <ResizablePanel defaultSize={33}>
                            <p className="font-bold text-foreground">Story:</p>
                            <p>
                              <span className="font-semibold text-emerald-700">
                                &bdquo;Als
                              </span>{" "}
                              <span className="text-foreground">
                                {cleanString(story.story_as)}{" "}
                              </span>
                              <span className="font-semibold text-emerald-700">
                                möchte ich
                              </span>{" "}
                              <span className="text-foreground">
                                {cleanString(story.story_like)},{" "}
                              </span>
                            </p>
                            <p>
                              <span className="font-semibold text-emerald-700">
                                um
                              </span>{" "}
                              <span className="text-foreground">
                                {cleanString(story.story_cause)}.&ldquo;
                              </span>
                            </p>
                          </ResizablePanel>
                          <ResizableHandle />
                          <ResizablePanel
                            defaultSize={33}
                            className="pl-2 pr-2"
                          >
                            <p className="font-bold text-foreground">Invest:</p>
                            <ul className="list-inside pl-2">
                              {[
                                "Independent",
                                "Negotiable",
                                "Valuable",
                                "Estimable",
                                "Small",
                                "Testable",
                              ].map((item) => {
                                const key =
                                  `${item.toLowerCase()}_check` as keyof typeof story.invest;
                                return (
                                  <li
                                    key={item}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    {story.invest[key] ? (
                                      <CircleCheck
                                        className="h-4 text-emerald-700 cursor-pointer"
                                        onClick={() =>
                                          handleInvestClick(key, story, true)
                                        }
                                      />
                                    ) : (
                                      <CircleDashed
                                        className="h-4 cursor-pointer"
                                        onClick={() =>
                                          handleInvestClick(key, story, false)
                                        }
                                      />
                                    )}
                                    <span
                                      className={cn(
                                        story.invest[key]
                                          ? "text-foreground"
                                          : null
                                      )}
                                    >
                                      {item}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </ResizablePanel>
                          <ResizableHandle />
                          <ResizablePanel
                            defaultSize={33}
                            className="pl-2 pr-2"
                          >
                            <p className="font-bold text-foreground">
                              Definition of done:
                            </p>
                            <ul className="list-disc list-inside pl-2">
                              {story.definition_of_done.map((dod, i) => {
                                return (
                                  <li
                                    key={i}
                                    className="flex flex-row gap-2 items-center"
                                  >
                                    {dod.done ? (
                                      <CircleCheck
                                        className="h-4 text-emerald-700"
                                        onClick={() => handleDodClick(i, story)}
                                      />
                                    ) : (
                                      <CircleDashed
                                        className="h-4 text-foreground"
                                        onClick={() => handleDodClick(i, story)}
                                      />
                                    )}
                                    <span
                                      className={cn(
                                        dod.done
                                          ? "line-through"
                                          : "text-foreground"
                                      )}
                                    >
                                      {dod.definition}
                                    </span>
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
