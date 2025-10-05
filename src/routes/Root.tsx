import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router";

export default function Root() {
  const { auth } = useAuth();
  const location = useLocation();

  // loader TODO: in Datei auslagern
  if (auth.status === "loading" || auth.status === "profileLoading") {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-100 text-zinc-700">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-zinc-400 border-t-zinc-900 rounded-full animate-spin" />
          <p className="text-sm font.medium tracking-wide">Initialisiere...</p>
        </div>
      </div>
    );
  }

  // not loged in -> login
  if (auth.status === "unauthenticated" && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  // loged in, but no profile (onboarding)
  if (
    auth.status === "profileNotBoarded" &&
    location.pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" replace />;
  }

  // loged in and profile complete
  if (
    auth.status === "ready" &&
    (location.pathname === "/" ||
      location.pathname === "" ||
      location.pathname === "/login" ||
      location.pathname === "/onboarding")
  ) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}
