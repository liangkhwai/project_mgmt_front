import React, { useEffect } from "react";
import { HiUserGroup } from "react-icons/hi";
import { MdEmojiPeople } from "react-icons/md";
import { Student, FilePdf } from "@phosphor-icons/react";
import { GiBookmarklet } from "react-icons/gi";
import TopChart from "./components/TopChart";
import TeacherInfo from "./components/TeacherInfo";
const Dashboard = () => {
  const [dashboard, setDashboard] = React.useState([]);
  const [max, setMax] = React.useState(0);
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

  return (
    <div className="bg-white">
      <div
        className="h-52 "
        style={{ background: "linear-gradient(#3B74AF 60%, white 40%)" }}
      >
        <div className="p-5 text-white text-xl">รายงานทั่วไปของวิชาโปรเจค</div>
        <div className="flex justify-around clear-both">
          <div className="px-5 py-2 h-32 bg-white rounded-xl text-center border flex flex-col justify-around">
            <div className="flex justify-center">
              <HiUserGroup size={30} />
            </div>
            <div className="font-medium text-2xl">{dashboard.countGroup}</div>
            <div className="text-center">จำนวนกลุ่มโปรเจคทั้งหมด</div>
          </div>
          <div className="px-5 py-2 h-32 bg-white rounded-xl text-center  border flex flex-col justify-around">
            <div className="flex justify-center">
              <MdEmojiPeople size={30} />
            </div>
            <div className="font-medium text-2xl">
              {dashboard.countResearcher}
            </div>
            <div className="text-center">จำนวนนักศึกษาที่กำลังศึกษาอยู่</div>
          </div>
          <div className="px-5 py-2 h-32 bg-white rounded-xl text-center  border flex flex-col justify-around">
            <div className="flex justify-center">
              <Student size={32} weight="fill" />
            </div>
            <div className="font-medium text-2xl">
              {dashboard.countResearcherWithStatusInGroup}
            </div>
            <div className="text-center">
              จำนวนนักศึกษาที่สำเร็จปริญญานิพนธ์
            </div>
          </div>
          <div className="px-5 py-2 h-32 bg-white rounded-xl text-center  border flex flex-col justify-around">
            <div className="flex justify-center">
              <GiBookmarklet size={30} />
            </div>
            <div className="font-medium text-2xl">{dashboard.countThesis}</div>
            <div className="text-center">จำนวนวิทยานิพนธ์</div>
          </div>
          <div className="px-5 py-2 h-32 bg-white rounded-xl text-center  border flex flex-col justify-around">
            <div className="flex justify-center">
              <FilePdf size={32} weight="fill" />{" "}
            </div>
            <div className="font-medium text-2xl">{dashboard.countFiles}</div>
            <div className="text-center">แบบฟอร์มเอกสาร</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 mx-5 gap-10">
        <div className="flex">
          <div className="flex-1 h-full">
            <div className="flex-grow h-full">
              <TopChart countStatus={dashboard.countStatus} max={max} />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 h-full">
            <div className="flex-grow h-full">
              <TeacherInfo countAdvisor={dashboard} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
