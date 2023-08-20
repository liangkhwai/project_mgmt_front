import React, { Fragment, useContext, useEffect, useState } from "react";
import Title from "../../../../UI/Title";
import Body from "../../../../UI/Body";
import FormRequestExam from "./components/FormRequestExam";

const RequestExam = () => {
 
  const [groupInfo, setGroupInfo] = useState(null);

  useEffect(() => {
    const getGroup = async () => {
      const response = await fetch("http://localhost:8080/group/getGroup", {
        method: "get",
        credentials: "include",
      });

      const data = await response.json();
      if (data) {
        console.log('hey');
        console.log(data);
        setGroupInfo(data);
      }
    };

    getGroup();
  }, []);

  return (
    <div className="mx-10">
      <Title>ขอสอบ</Title>
      <Body>
        
        
      {groupInfo ? (
          groupInfo && groupInfo.leaderId === parseInt(localStorage.getItem("id")) ? (
            <FormRequestExam groupInfo={groupInfo} />
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
