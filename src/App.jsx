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
import { getList, getSelfInfo } from "./loader/researcher";
import { getEventListTch } from "./loader/free_hours";
import React from "react";
import Thesis from "./pages/Landing/Thesis";
import Faq from "./pages/Landing/Faq";
import Morefaq from "./pages/Landing/Morefaq";
import Teacher from "./pages/Dashboard/Teacher/Teacher";
import Group from "./pages/Dashboard/Researcher/Group/Group";
import CreateGroup from "./pages/Dashboard/Researcher/Group/create_group/CreateGroup";
import { QueryClient, QueryClientProvider } from "react-query";
import { checkHasGroup, getGroupDetail } from "./loader/group";
import GroupList from "./pages/Dashboard/Teacher/Group/GroupList/GroupList";
import RandomGroup from "./pages/Dashboard/Teacher/Group/RandomGroup/RandomGroup";
import GroupDetail from "./pages/Dashboard/Teacher/Group/GroupList/components/GroupDetail";
import Calendar from "./pages/Dashboard/Teacher/Calendar/Calendar";
import RequestExam from "./pages/Dashboard/Researcher/Request_exam/RequestExam";
import Files from "./pages/Dashboard/Admin/Files/Files";
import Docs from "./pages/Landing/Docs";
import ExamRequest from "./pages/Dashboard/Teacher/ExamRequest/ExamRequest";
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
        path: "/files",
        element: <Docs />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/Morefaq",
        element: <Morefaq />,
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
        loader: getSelfInfo,
      },
      {
        path: "/dashboard/group/create",
        element: <CreateGroup />,
        loader: checkHasGroup,
      },
      {
        path: "/dashboard/grouplist",
        element: <GroupList />,
      },
      {
        path: "/dashboard/random",
        element: <RandomGroup />,
      },
      {
        path: "/dashboard/group/:grpId",
        element: <GroupDetail />,
        loader: ({ params }) => {
          return getGroupDetail(params.grpId);
        },
      },
      {
        path: "/dashboard/calendar/book/:tchId",
        element: <Calendar />,
        loader: ({ params }) => {
          return getEventListTch(params.tchId);
        },
      },
      {
        path: "/dashboard/request/exam",
        element: <RequestExam />,
      },
      {
        path: "/dashboard/files/upload",
        element: <Files />,
      },
      {
        path: "/dashboard/exam/request",
        element: <ExamRequest/>
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
