import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router";

export default function Root() {
  const { session, profile } = useAuth();
  const location = useLocation();
  console.log(profile);
  // not loged
  if (!session && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  if (session && !profile && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  if (
    session &&
    profile &&
    (location.pathname === "/" || location.pathname === "")
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
