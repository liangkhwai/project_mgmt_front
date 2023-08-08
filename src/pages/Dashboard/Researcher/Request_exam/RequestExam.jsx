import React, { useContext, useEffect, useState } from "react";
import Title from "../../../../UI/Title";
import Body from "../../../../UI/Body";
import FormRequestExam from "./components/FormRequestExam";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../context/auth";
const RequestExam = () => {
  const navigate = useNavigate();
  const [groupInfo, setGroupInfo] = useState();

  useEffect(() => {
    const getGroup = async () => {
      const response = await fetch("http://localhost:8080/group/getGroup", {
        method: "get",
        credentials: "include",
      });

      const data = await response.json();
      if (data) {
        setGroupInfo(data);
      } else {
        // alert("กรุณาสร้างกลุ่มก่อน");
        // navigate("/dashboard/group");
      }
    };

    // const getBoards = async () => {
    //   const response = await fetch(
    //     `http://localhost:8080/boards/get/${localStorage.getItem("grpId")}`,
    //     {
    //       method: "get",
    //       credentials: "include",
    //     }
    //   );

    //   const data = await response.json();
    //   console.log(data);
    //   if (data.length <= 0) {
    //     alert("รอการสุ่มกรรมการ");
    //     // window.location.href = '/dashboard/group'
    //     navigate("/dashboard/group");
    //   } else {
    //     ;
    //   }
    // };

    // getBoards();
    getGroup();
  }, []);

  return (
    <div className="mx-10">
      <Title>ขอสอบ</Title>
      <Body>
        {groupInfo ? (
          <FormRequestExam groupInfo={groupInfo} />
        ) : (
          <p>กรุณาสร้างกลุ่มโปรเจค...</p>
        )}
      </Body>
    </div>
  );
};

export default RequestExam;
