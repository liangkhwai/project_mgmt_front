import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLoaderData, useParams } from "react-router-dom";
import GroupMemberList from "./GroupMemberList";
import ExamRequestBox from "../../../../Researcher/Group/components/ExamRequestBox";
import BoardList from "../../../../Researcher/Group/components/BoardList";
import Body from "../../../../../../UI/Body";
import Title from "../../../../../../UI/Title";

const GroupDetail = () => {
  const getGroupDetail = useLoaderData();
  const [grpDetail, setGrpDetail] = useState(getGroupDetail);
  const [boards, setBoards] = useState([]);
  const [requestExam, setRequestExam] = useState([]);
  let { grpId } = useParams();
  useEffect(() => {
    const fetchBoards = async () => {
      const res = await fetch(`http://localhost:8080/boards/get/${grpId}`, {
        method: "get",
      });
      const data = await res.json();
      console.log(data);
      setBoards(data);
    };

    const fetchRequestExam = async () => {
      const res = await fetch(
        `http://localhost:8080/requestExam/getRequestGroup/${grpId}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      console.log(data);
      setRequestExam(data.slice(0, 3));
    };

    fetchBoards();

    fetchRequestExam();
  }, []);
  return (
    <div className="mx-10">
      <Title>รายละเอียดกลุ่มโปรเจค</Title>
      <Body>
        <GroupMemberList grpDetail={grpDetail}setGrpDetail={setGrpDetail} grpId={grpId} />
        <div className="grid grid-cols-12 gap-2 my-3">
          <div className="w-full  col-span-8 border rounded-xl shadow-md">
            <ExamRequestBox requestExam={requestExam} />
          </div>
          <div className="w-full col-span-4">
            {boards.length > 0 ? (
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
      </Body>
    </div>
  );
};

export default GroupDetail;
