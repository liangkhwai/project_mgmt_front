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
      <div class="grid grid-cols-4 gap-4 border border-gray-200 shadow-sm font-bold py-2">
        <div class="grid-item bg-gray-200">ชื่อหัวข้อ</div>
        <div class="grid-item bg-gray-200">สถานะ</div>
        <div class="grid-item bg-gray-200">ความคืบหน้า</div>
        <div class="grid-item bg-gray-200">สมาชิก</div>
        {isLoading && "Loading..."}
        {group.map((item, idx) => {
          return (
            <Fragment >
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
      </div>
    </div>
  );
};

export default GroupListBox;
