import { FolderKanban, Home, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import logo from "../assets/scrumplex_logo.png";
import { Outlet } from "react-router";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { useDisplay } from "@/contexts/DisplayContext";
import { getGreeting } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

export function AppLayout() {
  const { logout, auth } = useAuth();
  const { setActivePanel } = useDisplay();
  const greeting = getGreeting();

  return (
    <ProjectProvider>
      <div className="flex h-screen bg-zinc-200">
        {/* Sidebar */}
        <aside className="w-60 bg-zinc-800 text-zinc-200 flex flex-col">
          <div className="h-20 flex items-center px-2">
            <img
              src={logo}
              alt="Scrumplex Logo"
              className="h-18 brightness-220 drop-shadow-lg"
            />
          </div>
          <nav className="flex-1 px-3 py-5 space-y-1">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-600 cursor-pointer"
              onClick={() => setActivePanel("productBacklogList")}
            >
              <Home className="w-5 h-5" />
              <p>Dashboard</p>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-600 cursor-pointer"
              onClick={() => setActivePanel("projectList")}
            >
              <FolderKanban className="w-5 h-5" />
              <span>Projekte</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-600 cursor-pointer">
              <Settings className="w-5 h-5" />
              <span>Einstellungen</span>
            </div>
          </nav>
          <div className="p-4 text-xs text-zinc-400 border-t border-zinc-600">
            © 2025 Christian Grimm
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Dark Topbar */}
          <header className="h-20 bg-zinc-800 border-b border-zinc-600 flex items-center justify-between px-6 text-zinc-200">
            <div className="font-medium tracking-tight">
              {greeting},{" "}
              {auth.status === "ready" ? auth.profile.first_name : undefined}!
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={() => setActivePanel("newProject")}>
                Neues Projekt
              </Button>
              <Button onClick={logout}>Logout</Button>
            </div>
          </header>

          {/* Flache Arbeitsfläche */}
          <main className="flex-1 overflow-y-auto p-6">
            {/* direkt auf bg-zinc-200 – hier kannst du Cards platzieren */}
            <Toaster position="top-center" />
            <Outlet />
          </main>
        </div>
      </div>
    </ProjectProvider>
  );
}

export default AppLayout;
