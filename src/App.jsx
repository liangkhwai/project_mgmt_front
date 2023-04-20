import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Landing/Home";
import Login from "./pages/Landing/Login";
import Landing from "./pages/Layout/Landing/LayoutPublicContent";
import LayoutManageContent from "./pages/Layout/Dashboard/LayoutDashboard";
import Dashboard from "./pages/Dashboard/Dashboard";
import { checkAuth } from "./auth/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
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
    loader:checkAuth,
    children: [
      {
        path: "index",
        element: <Dashboard />,
        loader: checkAuth,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
