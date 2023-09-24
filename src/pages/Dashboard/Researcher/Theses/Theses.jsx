import React, { useState } from "react";
import Body from "../../../../UI/Body";
import Title from "../../../../UI/Title";
import ThesisImg from "./components/ThesisImg";
import ThesisDetail from "./components/ThesisDetail";
import { useEffect } from "react";
import { Fragment } from "react";

const Theses = () => {
  const [groupInfo, setGroupInfo] = useState([]);

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
    getGroupInfo();
  }, []);

  return (
    <div className="mx-10">
      <Title>อัพโหลดวิทยานิพนธ์</Title>
      <Body>
        {groupInfo.leaderId === parseInt(localStorage.getItem("id")) ? (
          <Fragment>
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-2 h-auto">
                <ThesisImg />
              </div>
              <div className="col-span-4 h-auto">
                <ThesisDetail />
              </div>
            </div>
            <div className="text-end my-5">
              <button className="px-4 py-2 bg-green-400 text-white rounded-xl">
                อัพโหลด
              </button>
            </div>
          </Fragment>
        ) : (
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
