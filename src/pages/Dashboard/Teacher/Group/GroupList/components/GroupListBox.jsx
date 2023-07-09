import React, { Fragment, useEffect, useState, useContext } from "react";
import ProgressBar from "../../../../../../UI/ProgressBar";
import AuthContext from "../../../../../../context/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const GroupListBox = () => {
  const [group, setGroup] = useState([]);
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
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

  if (isLoading) return "...Loading group";
  const clickDetailHandler = (id) => {
    navigate(`/dashboard/group/${id}`);
  };

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
              <tr className="hover:bg-gray-300 " key={item.id}>
                <td className="">{item.title ? item.title : "ไม่มีชื่อหัวข้อ"}</td>
                <td>{item.status}</td>
                <td className="">
                  <ProgressBar percent={Math.floor(Math.random() * 100)} />
                </td>
                <td>{null}</td>
                {ctx.role === "admin" && (
                  <Fragment>
                    <td>
                      <button
                        onClick={() => clickDetailHandler(item.id)}
                        className="px-2 py-1 bg-green-200 rounded"
                      >
                        รายละเอียด
                      </button>
                    </td>
                    <td>
                      <button className="px-2 py-1 bg-red-200 rounded">
                        ลบ
                      </button>
                    </td>
                  </Fragment>
                )}
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
