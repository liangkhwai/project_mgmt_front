import React, { useState, useEffect } from "react";
import Body from "../../../../UI/Body";
import Title from "../../../../UI/Title";
import BoardGroup from "./components/BoardGroup";
import RequestCategorie from "./components/RequestCategorie";
import TitleGroup from "./components/TitleGroup";
import BoardCalendar from "./components/BoardCalendar";

const RequestBooking = () => {
  const [groupInfo, setGroupInfo] = useState(null);
  const [boards, setBoards] = useState([]);
  const [lastEvent, setLastEvent] = useState(null);
  useEffect(() => {
    const fetchBoards = async () => {
      const res = await fetch(
        `http://localhost:8080/boards/get/${localStorage.getItem("grpId")}`,
        {
          method: "get",
        }
      );
      const data = await res.json();
      console.log(data);
      setBoards(data);
    };
    const getGroup = async () => {
      const response = await fetch("http://localhost:8080/group/getGroup", {
        method: "get",
        credentials: "include",
      });
      const data = await response.json();
      if (data) {
        console.log("hey");
        console.log(data);
        setGroupInfo(data);
      }
    };
    const getLastRequest = async () => {
      const response = await fetch(
        `http://localhost:8080/requestExam/getLastRequest/${localStorage.getItem(
          "grpId"
        )}`,
        {
          method: "get",
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log(data);
      setLastEvent(data);
    };
    getLastRequest();
    getGroup();
    fetchBoards();
  }, []);

  return (
    <div className="mx-10">
      <Title>ขึ้นสอบปริญญานิพนธ์</Title>
      <Body>
        {lastEvent?.isApprove ? (
          <>
            <div className="text-center text-2xl my-5">ขึ้นสอบปริญญานิพนธ์</div>
            <div className="text-center text-2xl my-5">
              สาขาวิชาระบบสารสนเทศ มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน
              วิทยาเขตขอนแก่น
            </div>
            <TitleGroup groupInfo={groupInfo} />
            <RequestCategorie groupInfo={groupInfo} />
            <BoardGroup boards={boards} />
            <BoardCalendar groupInfo={groupInfo} />
          </>
        ) : (
          <div>กรุณายื่นใบขอขึ้นสอบ หรือ รออาจารย์อนุมัติการขึ้นสอบ</div>
        )}
      </Body>
    </div>
  );
};

export default RequestBooking;
