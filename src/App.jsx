import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Landing/Home";
import Login from "./pages/Landing/Login";
import Root from "./pages/Layout/LayoutPublicContent";
import LayoutManageContent from "./pages/Layout/Dashboard/LayoutDashboard";
import Dashboard from "./pages/Dashboard/Dashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <LayoutManageContent />,
    children: [{ path: "index", element: <Dashboard /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
