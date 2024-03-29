import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Landing/Home";
import Contact from "./pages/Landing/Contact";
import Login from "./pages/Landing/Login/Login";
import Landing from "./pages/Layout/Landing/LayoutPublicContent";
import LayoutManageContent from "./pages/Layout/Dashboard/LayoutDashboard";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useContext } from "react";
import { checkAuth, checkRole } from "./loader/auth";
import ResearcherList from "./pages/Dashboard/Researcher/Researcher";
import { getList, getSelfInfo } from "./loader/researcher";
import { getAllEvents, getEventListTch } from "./loader/free_hours";
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
import CalendarView from "./pages/Dashboard/Teacher/Calendar/views/CalendarView";
import th from "dayjs/locale/th";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import { checkBoards } from "./loader/boards";
import RequestBooking from "./pages/Dashboard/Researcher/Request_booking/RequestBooking";
import ExamResult from "./pages/Dashboard/Admin/Result/ExamResult";
import LineNotify from "./pages/Line/LineNotify";
import Theses from "./pages/Dashboard/Researcher/Theses/Theses";
import NewThesis from "./pages/Landing/NewThesis";
import Random from "./pages/Dashboard/Teacher/Group/RandomGroup/ManualRandom/Random";
import RequestTitle from "./pages/Dashboard/Admin/RequestTitle/RequestTitle";
import Personal from "./pages/Personal/Personal";
import Password from "./pages/Password/Password";
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale(th);
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
        element: <NewThesis />,
      },
      {
        path: "/theses",
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
        element: <Random />,
      },
      {
        path: "/dashboard/group/:grpId",
        element: <GroupDetail />,
        loader: ({ params }) => {
          return getGroupDetail(params.grpId);
        },
      },
      {
        path: "/dashboard/calendar/book",
        element: <Calendar />,
        loader: () => {
          return getAllEvents();
        },
      },
      // {
      //   path: "/dashboard/calendar/view",
      //   element: <CalendarView />,
      //   loader: ()=> getAllEvents()
      // },
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
        element: <ExamRequest />,
      },
      {
        path: "/dashboard/exam/booking",
        element: <RequestBooking />,
      },
      {
        path: "/dashboard/exam/result",
        element: <ExamResult />,
      },
      {
        path: "/dashboard/line/invite",
        element: <LineNotify />,
      },
      {
        path: "/dashboard/thesis/upload",
        element: <Theses />,
      },
      {
        path: "/dashboard/request/title",
        element: <RequestTitle />,
      },
      {
        path: "/dashboard/personal",
        element: <Personal />,
        loader: checkRole,
      },
      {
        path: "/dashboard/profile/edit",
        element: <Password />,
        loader: checkRole,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
