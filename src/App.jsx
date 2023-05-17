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
        element: <Teacher/>,
        // loader: getList,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
