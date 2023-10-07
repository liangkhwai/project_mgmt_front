import React, { Fragment, useEffect, useState } from "react";

const BoardInfo = () => {
  const [boardInfo, setBoardInfo] = useState([]);
  useEffect(() => {
    const getBoardInfo = async () => {
      const response = await fetch("http://localhost:8080/boards/info", {
        method: "get",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setBoardInfo(data);
    };
    getBoardInfo();
  }, []);
  return (
    <div className="w-full ">
      <div className="grid grid-cols-5 content-center py-1 text-center">
        <div className="flex w-full items-center justify-center bg-gray-200 py-4">
          ชื่อ
        </div>
        <div className="flex w-full items-center justify-center bg-gray-200 py-4">
          {" "}
          นามสกุล
        </div>
        <div className="flex w-full items-center justify-center bg-gray-200 py-4">
          ที่ปรึกษา
        </div>
        <div className="flex w-full items-center justify-center bg-gray-200 py-4">
          ประธานกรรมสอบ
        </div>
        <div className="flex w-full items-center justify-center bg-gray-200 py-4">
          กรรมการสอบ
        </div>
      </div>
      <div>
        {boardInfo.map((obj, index) => {
          return (
            <div
              key={index}
              className={`{${
                index === 0 && "group:rounded-t-xl"
              }} grid grid-cols-5`}
            >
              <div
                className={` flex w-full items-center justify-center bg-gray-200 py-4`}
              >
                {obj.firstname}
              </div>
              <div className="group flex w-full items-center justify-center bg-gray-200 py-4">
                {obj.lastname}
              </div>
              <div className="group flex w-full items-center justify-center bg-gray-200 py-4">
                {obj.advisor_count} กลุ่ม
              </div>
              <div className="group flex w-full items-center justify-center bg-gray-200 py-4">
                {obj.board1_count} กลุ่ม
              </div>
              <div
                className={` flex w-full items-center justify-center bg-gray-200 py-4`}
              >
                {obj.board2_count} กลุ่ม
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoardInfo;
