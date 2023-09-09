import React, { Fragment, useContext, useEffect, useState } from "react";
import Title from "../../../../UI/Title";
import Body from "../../../../UI/Body";
import FormRequestExam from "./components/FormRequestExam";

const RequestExam = () => {
  const [groupInfo, setGroupInfo] = useState(null);
  const [lastEvent, setLastEvent] = useState(null);

  useEffect(() => {
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
  }, []);
  console.log(lastEvent);
  return (
    <div className="mx-10">
      <Title>ใบแจ้งนัดหมายการสอบ</Title>
      <Body>
        {groupInfo ? (
          groupInfo &&
          groupInfo.leaderId === parseInt(localStorage.getItem("id")) ? (
            <>
              {lastEvent ? (
                lastEvent.isApprove === 0 ? (
                  <FormRequestExam groupInfo={groupInfo} />
                ) : (
                  <div>คุณได้ทำการขอสอบแล้ว</div>
                )
              ) : (
                <>
                  <FormRequestExam groupInfo={groupInfo} />
                </>
              )}
            </>
          ) : (
            <div>ติดต่อหัวหน้ากลุ่มเพื่อทำการขอสอบ</div>
          )
        ) : (
          <div>กรุณาสร้างกลุ่ม</div>
        )}
      </Body>
    </div>
  );
};

export default RequestExam;
