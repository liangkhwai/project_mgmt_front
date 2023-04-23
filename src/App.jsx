import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Landing/Home";
import Login from "./pages/Landing/Login";
import Landing from "./pages/Layout/Landing/LayoutPublicContent";
import LayoutManageContent from "./pages/Layout/Dashboard/LayoutDashboard";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useContext } from "react";
import { checkAuth } from "./loader/auth";
import ResearcherList from "./pages/crud/Researcher/Researcher";
import { getList } from "./loader/researcher";

const router = createBrowserRouter([
  {
    element: <Landing />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <LayoutManageContent />,
    loader: checkAuth,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: checkAuth,
      },
      {
        path:'/dashboard/researcher',
        element:<ResearcherList/>,
        loader:getList
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
