import React, { Fragment, useEffect, useState } from "react";
import GroupList from "./GroupList";
import BoardList from "./BoardList";
import ExamRequestBox from "./ExamRequestBox";
import { useQuery } from "react-query";

const GroupBox = ({ selfInfo }) => {
  const [boards, setBoards] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [requestExam, setRequestExam] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const res = await fetch(
        `http://127.0.0.1:8080/boards/get/${selfInfo.groupId}`,
        {
          method: "get",
        }
      );
      const data = await res.json();
      console.log(data);
      setBoards(data);
    };

    const fetchMember = async () => {
      const res = await fetch(
        `http://127.0.0.1:8080/researcher/getGroupList/${selfInfo.groupId}`,
        {
          method: "get",
        }
      );
      const data = await res.json();

      setGroupList(data);
    };

    const fetchRequestExam = async () => {
      const res = await fetch(
        `http://127.0.0.1:8080/requestExam/getRequestGroup/${selfInfo.groupId}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      // setRequestExam(data.slice(0, 3));
      setRequestExam(data);
    };

    fetchBoards();
    fetchMember();
    fetchRequestExam();
  }, []);

  

  return (
    <div>
      <GroupList groupList={groupList} setGroupList={setGroupList} />
      <div className="grid grid-cols-12 gap-2 my-3">
        <div className="w-full  col-span-8 border rounded-xl shadow-md">
          <ExamRequestBox requestExam={requestExam} />
        </div>
        <div className="w-full col-span-4">
          {boards?.length > 0 ? (
            <div className="flex flex-col border rounded-xl shadow-md">
              {<BoardList boards={boards} />}
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              รอผู้ดูแลระบบสุ่ม
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupBox;
