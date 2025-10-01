import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./routes/Root";
import Home from "./routes/Home";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [{ index: true, element: <Home /> }],
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
