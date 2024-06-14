import React, { useState } from "react";
import Body from "../../../../UI/Body";
import Title from "../../../../UI/Title";
import ThesisImg from "./components/ThesisImg";
import ThesisDetail from "./components/ThesisDetail";
import { useEffect } from "react";
import { Fragment } from "react";
import FormThesis from "./components/FormThesis";

const Theses = () => {
  const [groupInfo, setGroupInfo] = useState({});
  const [groupMember, setGroupMember] = useState([]);
  const [boards, setBoards] = useState([]);
  const [theses, setTheses] = useState([]);
  useEffect(() => {
    const getGroupInfo = async () => {
      const response = await fetch("http://127.0.0.1:8080/group/getGroup", {
        method: "get",
        credentials: "include",
      });
      const data = await response.json();
      setGroupInfo(data);
      console.log(data);
    };
    const getGroupMember = async () => {
      const res = await fetch("http://127.0.0.1:8080/group/getGroupMember", {
        method: "POST",
        body: JSON.stringify({
          grpId: parseInt(localStorage.getItem("grpId")),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setGroupMember(data);
    };
    const getBoards = async () => {
      const response = await fetch(
        `http://127.0.0.1:8080/boards/get/${localStorage.getItem("grpId")}`,
        {
          method: "get",
          credentials: "include",
        },
      );
      const data = await response.json();
      console.log(data);
      setBoards(data);
    };

    const getThesis = async () => {
      const response = await fetch(
        `http://127.0.0.1:8080/thesis/get/${localStorage.getItem("grpId")}`,
        {
          method: "get",
          credentials: "include",
        },
      );
      const data = await response.json();
      console.log(data);
      setTheses(data);
    };

    getGroupInfo();
    getGroupMember();
    getBoards();
    getThesis();
  }, []);

  return (
    <div className="mx-10">
      <Title>อัปโหลดปริญญายานิพนธ์</Title>
      <Body>
        {groupInfo ? (
          <Fragment>
            {groupInfo.status === "รอส่งปริญญานิพนธ์" ? (
              <Fragment>
                {groupInfo.leaderId === parseInt(localStorage.getItem("id")) ? (
                  <FormThesis
                    groupInfo={groupInfo}
                    groupMember={groupMember}
                    boards={boards}
                  />
                ) : (
                  <div className="text-center">
                    {" "}
                    คุณไม่ใช่หัวหน้ากลุ่ม ไม่สามารถอัพโหลดได้
                  </div>
                )}
              </Fragment>
            ) : (
              <Fragment>
                {theses ? (
                  <div>ท่านได้ส่งปริญญานิพนธ์เรียบร้อยแล้ว</div>
                ) : (
                  <div>สามารถส่งปริญญานิพนธ์ได้หลังจากสอบป้องกัน</div>
                )}
              </Fragment>
            )}
          </Fragment>
        ) : (
          <div>กรุณาสร้างกลุ่มโปรเจค</div>
        )}
      </Body>
    </div>
  );
};

export default Theses;
