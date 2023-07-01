import React, { Fragment, useEffect, useState } from "react";
import ProgressBar from "../../../../../../UI/ProgressBar";
import { useQuery } from "react-query";

const GroupListBox = () => {
  const [group, setGroup] = useState([]);

  const { isLoading, isError, data, error } = useQuery(
    "getAllGroup",
    async () => {
      const response = await fetch("http://localhost:8080/group/getAllGroup", {
        credentials: "include",
      });

      const data = await response.json();
      return data;
    }
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      setGroup(data);
    }
  }, [data]);

  return (
    <div>
      <table className="table w-full">
        <thead>
          <tr className="text-md text-center">
            <td>ชื่อหัวข้อ</td>
            <td>สถานะ</td>
            <td>ความคืบหน้า</td>
            <td>สมาชิก</td>
          </tr>
        </thead>
        <tbody>
          {group.map((item, idx) => {
            return (
              <tr className="hover:bg-gray-300" key={item.id}>
                <td>{item.title ? item.title : "ไม่มีชื่อหัวข้อ"}</td>
                <td>{item.status}</td>
                <td className="">
                  <ProgressBar percent={Math.floor(Math.random() * 100)} />
                </td>
                <td>{null}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <div className="grid grid-cols-4 gap-4 border border-gray-200 shadow-sm font-bold py-2">
        <div className="grid-item bg-gray-200">ชื่อหัวข้อ</div>
        <div className="grid-item bg-gray-200">สถานะ</div>
        <div className="grid-item bg-gray-200">ความคืบหน้า</div>
        <div className="grid-item bg-gray-200">สมาชิก</div>
        {isLoading && "Loading..."}
        {group.map((item, idx) => {
          return (
            <Fragment key={item.id} >
              <div className="grid-item bg-gray-200 hover:bg-gray-300">
                {item.title ? item.title : "ไม่มีชื่อหัวข้อ"}
              </div>
              <div className="grid-item bg-gray-200 hover:bg-gray-300">{item.status}</div>
              <div className="grid-item bg-gray-200 hover:bg-gray-300 flex items-center">
                <ProgressBar percent={20} />
              </div>
              <div className="grid-item bg-gray-200 hover:bg-gray-300">{null}</div>
            </Fragment>
          );
        })}
      </div> */}
    </div>
  );
};

export default GroupListBox;
