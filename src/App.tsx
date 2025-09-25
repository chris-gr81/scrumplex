import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./routes/Root";
import Home from "./routes/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [{ index: true, element: <Home /> }],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
