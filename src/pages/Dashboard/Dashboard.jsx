import React, { useEffect } from "react";
import { HiUserGroup } from "react-icons/hi";
import { MdEmojiPeople } from "react-icons/md";
import { Student, FilePdf } from "@phosphor-icons/react";
import { GiBookmarklet } from "react-icons/gi";
import TopChart from "./components/TopChart";
import TeacherInfo from "./components/TeacherInfo";
import GroupProject from "./components/GroupProject";
import ResearcherWithIncomplete from "./components/ResearcherWithIncomplete";
import ResearcherWithNotRegister from "./components/ResearcherWithNotRegister";
const Dashboard = () => {
  const [dashboard, setDashboard] = React.useState([]);
  const [max, setMax] = React.useState(0);
  const [nowPage, setNowPage] = React.useState(0);
  const [itemOffset, setItemOffSet] = React.useState(0);
  useEffect(() => {
    const getDashboard = async () => {
      const response = await fetch("http://localhost:8080/dashboard/list");
      const dashboard = await response.json();
      console.log(dashboard);
      setMax(dashboard.countStatus.reduce((a, b) => a + b, 2));
      setDashboard(dashboard);
    };
    getDashboard();
  }, []);

  if (!dashboard) return <div>loading...</div>;
  return (
    <div className="bg-white">
      <div
        className="h-52 "
        style={{ background: "linear-gradient(#3B74AF 60%, white 40%)" }}
      >
        <div className="p-5 text-xl text-white">รายงานทั่วไปของวิชาโปรเจค</div>
        <div className="clear-both flex justify-around">
          <div className="flex h-32 flex-col justify-around rounded-xl border bg-white px-5 py-2 text-center">
            <div className="flex justify-center">
              <HiUserGroup size={30} />
            </div>
            <div className="text-2xl font-medium">{dashboard.countGroup}</div>
            <div className="text-center">จำนวนกลุ่มโปรเจคทั้งหมด</div>
          </div>
          <div className="flex h-32 flex-col justify-around rounded-xl border  bg-white px-5 py-2 text-center">
            <div className="flex justify-center">
              <MdEmojiPeople size={30} />
            </div>
            <div className="text-2xl font-medium">
              {dashboard.countResearcher}
            </div>
            <div className="text-center">จำนวนนักศึกษาที่กำลังศึกษาอยู่</div>
          </div>
          <div className="flex h-32 flex-col justify-around rounded-xl border  bg-white px-5 py-2 text-center">
            <div className="flex justify-center">
              <Student size={32} weight="fill" />
            </div>
            <div className="text-2xl font-medium">
              {dashboard.countResearcherWithStatusInGroup}
            </div>
            <div className="text-center">
              จำนวนนักศึกษาที่สำเร็จปริญญานิพนธ์
            </div>
          </div>
          <div className="flex h-32 flex-col justify-around rounded-xl border  bg-white px-5 py-2 text-center">
            <div className="flex justify-center">
              <GiBookmarklet size={30} />
            </div>
            <div className="text-2xl font-medium">{dashboard.countThesis}</div>
            <div className="text-center">จำนวนวิทยานิพนธ์</div>
          </div>
          <div className="flex h-32 flex-col justify-around rounded-xl border  bg-white px-5 py-2 text-center">
            <div className="flex justify-center">
              <FilePdf size={32} weight="fill" />{" "}
            </div>
            <div className="text-2xl font-medium">{dashboard.countFiles}</div>
            <div className="text-center">แบบฟอร์มเอกสาร</div>
          </div>
        </div>
      </div>
      <div className="mx-5">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-7">
            <TopChart countStatus={dashboard.countStatus} max={max} />
          </div>
          <div className="col-span-5">
            <TeacherInfo countAdvisor={dashboard} />
          </div>
        </div>
        <div className="my-5"></div>
        <div>
          <GroupProject
            group={dashboard}
            itemOffset={itemOffset}
            nowPage={nowPage}
            setItemOffSet={setItemOffSet}
            setNowPage={setNowPage}
          />
        </div>
        <div className="my-5"></div>
        <div className="grid grid-cols-2 gap-5 h-full pb-5">
          <div>
            <ResearcherWithIncomplete dashboard={dashboard} />
          </div>
          <div>
            <ResearcherWithNotRegister dashboard={dashboard} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
