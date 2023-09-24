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
  useEffect(() => {
    const getGroupInfo = async () => {
      const response = await fetch("http://localhost:8080/group/getGroup", {
        method: "get",
        credentials: "include",
      });
      const data = await response.json();
      setGroupInfo(data);
      console.log(data);
    };
    const getGroupMember = async () => {
      const res = await fetch("http://localhost:8080/group/getGroupMember", {
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
        `http://localhost:8080/boards/get/${localStorage.getItem("grpId")}`,
        {
          method: "get",
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      setBoards(data);
    };

    getGroupInfo();
    getGroupMember();
    getBoards();
  }, []);

  return (
    <div className="mx-10">
      <Title>อัพโหลดวิทยานิพนธ์</Title>
      <Body>
        {groupInfo.leaderId === parseInt(localStorage.getItem("id")) ? (
          <FormThesis
            groupInfo={groupInfo}
            groupMember={groupMember}
            boards={boards}
          />
        ) : (
          // <Fragment>
          //   <form>
          //     <div className="grid grid-cols-6 gap-4">
          //       <div className="col-span-2 h-auto">
          //         <ThesisImg />
          //       </div>
          //       <div className="col-span-4 h-auto">
          //         <ThesisDetail
          //           groupInfo={groupInfo}
          //           groupMember={groupMember}
          //           boards={boards}
          //         />
          //       </div>
          //     </div>
          //     <div className="text-end my-5">
          //       <button className="px-4 py-2 bg-green-400 text-white rounded-xl">
          //         อัพโหลด
          //       </button>
          //     </div>
          //   </form>
          // </Fragment>
          <div className="text-center">
            {" "}
            คุณไม่ใช่หัวหน้ากลุ่ม ไม่สามารถอัพโหลดได้
          </div>
        )}
      </Body>
    </div>
  );
};

export default Theses;