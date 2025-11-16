import ProductBacklogList from "@/components/productBacklog/ProductBacklogList";
import NewProject from "@/components/projects/NewProject";
import ProjectList from "@/components/projects/ProjectList";
import UserStoryForm from "@/components/productBacklog/UserStoryForm";
import { useContext, createContext, useState, type ReactNode } from "react";
import type { StoryType } from "@/schemas";

type PanelState =
  | { type: "empty" }
  | { type: "newProject" }
  | { type: "projectList" }
  | { type: "productBacklogList" }
  | { type: "userStory"; isEdit: boolean; payload?: StoryType };

type DisplayContextValue = {
  getActivePanel: () => ReactNode;
  setActivePanel: (panel: PanelState) => void;
};

const DisplayContext = createContext<DisplayContextValue | undefined>(
  undefined
);

export function DisplayProvider({ children }: { children: ReactNode }) {
  const [activePanel, setActivePanel] = useState<PanelState>({ type: "empty" });

  const getActivePanel = (): ReactNode => {
    switch (activePanel.type) {
      case "empty":
        return <div>Kein Inhalt</div>;
      case "newProject":
        return <NewProject />;
      case "projectList":
        return <ProjectList />;
      case "productBacklogList":
        return <ProductBacklogList />;
      case "userStory":
        return (
          <UserStoryForm
            edit={activePanel.isEdit}
            payload={activePanel.payload}
          />
        );
      default:
        return <div>Default Fall</div>;
    }
  };

  return (
    <DisplayContext.Provider
      value={{
        getActivePanel,
        setActivePanel,
      }}
    >
      {children}
    </DisplayContext.Provider>
  );
}

export function useDisplay() {
  const ctx = useContext(DisplayContext);
  if (!ctx)
    throw new Error("useContext must be used within an DisplayProvider");
  return ctx;
}
