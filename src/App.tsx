import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./routes/Root";
import Home from "./routes/Home";
import { AuthProvider } from "./contexts/AuthContext";
import { LoginForm } from "./components/login-form";
import ProfileCard from "./components/ProfileCard";
import AuthLayout from "./components/AuthLayout";
import AppLayout from "./components/AppLayout";

function App() {
  const router = createBrowserRouter([
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
          children: [{ path: "dashboard", element: <Home /> }],
        },
      ],
    },
    { path: "*", element: <div>404 Not Found</div> },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
