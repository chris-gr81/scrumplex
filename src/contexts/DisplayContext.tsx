import ProductBacklogList from "@/components/productBacklog/ProductBacklogList";
import NewProject from "@/components/projects/NewProject";
import ProjectWorkspace from "@/components/projects/ProjectWorkspace";
import UserStoryForm from "@/components/productBacklog/UserStoryForm";
import { useContext, createContext, useState, type ReactNode } from "react";
import type { StoryType } from "@/schemas";
import Dashboard from "@/components/dashboard/Dashboard";

type PanelState =
  | { type: "dashboard" }
  | { type: "newProject" }
  | { type: "projectWorkspace" }
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
  const [activePanel, setActivePanel] = useState<PanelState>({
    type: "dashboard",
  });

  const getActivePanel = (): ReactNode => {
    switch (activePanel.type) {
      case "dashboard":
        return <Dashboard />;
      case "newProject":
        return <NewProject />;
      case "projectWorkspace":
        return <ProjectWorkspace />;
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
