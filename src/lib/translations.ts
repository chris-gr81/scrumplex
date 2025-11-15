export const storypointMap = {
  none: "0 - Unbestimmt",
  trivial: "1 - Trivial",
  small: "2 - Klein",
  medium: "3- Mittel",
  large: "5 - Komplex",
  xl: "8 - Groß",
  epic: "13 - Epic",
};

export const priorityMap = {
  must: "Pflicht",
  high: "Hoch",
  medium: "Mittel",
  low: "Niedrig",
  icebox: "Icebox",
};

export const statusMap = {
  draft: "Entwurf",
  refinement: "Verfeinern",
  ready: "Sprint-Ready",
  progress: "Im Sprint",
  done: "Abgeschlossen",
  discarded: "verworfen",
};

export type storypointKey = keyof typeof storypointMap;

export const translateMetrics = (word: string, map: Record<string, string>) => {
  return map[word] ?? word;
};
