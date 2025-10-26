import NewProject from "@/components/projects/NewProject";
import ProjectList from "@/components/projects/ProjectList";
import { useContext, createContext, useState, type ReactNode } from "react";

type PanelOptions = "empty" | "newProject" | "projectList";

type DisplayContextValue = {
  getActivePanel: () => ReactNode;
  setActivePanel: (panel: PanelOptions) => void;
};

const DisplayContext = createContext<DisplayContextValue | undefined>(
  undefined
);

export function DisplayProvider({ children }: { children: ReactNode }) {
  const [activePanel, setActivePanel] = useState<PanelOptions>("empty");

  const getActivePanel = (): ReactNode => {
    switch (activePanel) {
      case "empty":
        return <div>Kein Inhalt</div>;
      case "newProject":
        return <NewProject />;
      case "projectList":
        return <ProjectList />;
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
