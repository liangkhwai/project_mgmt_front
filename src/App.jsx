import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Landing/Home";
import Contact from "./pages/Landing/Contact";
import Login from "./pages/Landing/Login/Login";
import Landing from "./pages/Layout/Landing/LayoutPublicContent";
import LayoutManageContent from "./pages/Layout/Dashboard/LayoutDashboard";
import Dashboard from "./pages/Dashboardd/Dashboard";
import { useContext } from "react";
import { checkAuth } from "./loader/auth";
import ResearcherList from "./pages/Dashboard/Researcher/Researcher";
import { getList } from "./loader/researcher";
import React from "react";
import Thesis from "./pages/Landing/Thesis";
import Faq from "./pages/Landing/Faq";
import Teacher from "./pages/Dashboard/Teacher/Teacher";
import Group from "./pages/Dashboard/Researcher/Group/Group";
import CreateGroup from "./pages/Dashboard/Researcher/Group/create_group/CreateGroup";
import { QueryClient, QueryClientProvider } from "react-query";
import { checkHasGroup } from "./loader/group";
import GroupList from "./pages/Dashboard/Teacher/Group/GroupList/GroupList";
import RandomGroup from "./pages/Dashboard/Teacher/Group/RandomGroup/RandomGroup";
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
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/thesis",
        element: <Thesis />,
      },
      {
        path: "/faq",
        element: <Faq />,
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
        path: "/dashboard/researcher",
        element: <ResearcherList />,
        loader: getList,
      },
      {
        path: "/dashboard/teacher",
        element: <Teacher />,
      },
      {
        path: "/dashboard/group",
        element: <Group />,
      },
      {
        path: "/dashboard/group/create",
        element: <CreateGroup />,
        loader: checkHasGroup,
      },
      {
        path:"/dashboard/grouplist",
        element: <GroupList/>
      },
      {
        path:"/dashboard/random",
        element: <RandomGroup/>
      }
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
