import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Root from "./routes/Root";
import Workspace from "./routes/Workspace";
import { AuthProvider } from "./contexts/AuthContext";
import { LoginForm } from "./components/login-form";
import ProfileCard from "./components/ProfileCard";
import AuthLayout from "./components/AuthLayout";
import AppLayout from "./components/AppLayout";
import { DisplayProvider } from "./contexts/DisplayContext";
import { Toaster } from "sonner";

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Root />, // Gatekeeper
        children: [
          {
            element: <AuthLayout />,
            children: [
              { path: "login", element: <LoginForm /> },
              { path: "onboarding", element: <ProfileCard /> },
            ],
          },
          {
            element: <AppLayout />,
            children: [
              { index: true, element: <Navigate to="/workspace" replace /> },
              { path: "workspace", element: <Workspace /> },
            ],
          },
        ],
      },
      { path: "*", element: <div>404 Not Found</div> },
    ],
    { basename: "/scrumplex" }
  );
  return (
    <AuthProvider>
      <DisplayProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </DisplayProvider>
    </AuthProvider>
  );
}

export default App;
