import { type ProjectListType, type StoryType } from "@/schemas";

const PRIORITY_ORDER: string[] = [
  "must",
  "high",
  "medium",
  "low",
  "icebox",
] as const;

const INACTIVE_STATUS: string[] = ["done", "discarded"] as const;

const mapPriority = (prio: string | undefined) => {
  return PRIORITY_ORDER.indexOf(prio ?? "");
};

export const sortStories = (stories: StoryType[]) => {
  const priorised = [...stories].sort(
    (a, b) => mapPriority(a.priority) - mapPriority(b.priority)
  );

  return priorised.sort((a, b) => {
    const aInactive = INACTIVE_STATUS.includes(a.status ?? "");
    const bInactive = INACTIVE_STATUS.includes(b.status ?? "");

    if (aInactive && !bInactive) return 1;
    if (!aInactive && bInactive) return -1;
    return 0; // keeps original priority sort order
  });
};

export const sortProjects = (projects: ProjectListType) => {
  return [...projects].sort((a, b) => {
    // 1) ZUERST nach finished sortieren (offen zuerst)
    if (a.finished !== b.finished) {
      return a.finished ? 1 : -1; // false kommt vor true
    }

    // 2) Wenn beide gleicher finished-Status → updated_at DESC
    const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
    const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0;

    return dateB - dateA;
  });
};
