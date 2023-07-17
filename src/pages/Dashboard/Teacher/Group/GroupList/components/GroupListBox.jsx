import React, { Fragment, useEffect, useState, useContext } from "react";
import ProgressBar from "../../../../../../UI/ProgressBar";
import AuthContext from "../../../../../../context/auth";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";


const GroupListBox = () => {
  const [group, setGroup] = useState([]);
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const deleteGroup = useMutation({
    mutationFn: async (grpId) => {
      const response = await fetch("http://localhost:8080/group/removeGroup", {
        method: "post",
        body: JSON.stringify({ grpId: parseInt(grpId) }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 500) {
        throw new Error(
          "Failed to delete the group. It is referenced by other records."
        );
      }
      return await response.json();
    },
    onSuccess: (data) => {
      setGroup(group.filter((item) => item.id !== parseInt(data)));
    },
    onError: (data) => {
      alert(data);
    },
  });

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

  const deleteGroupHandler = (grpId) => {
    deleteGroup.mutate(grpId);
  };
  return (
    <div>
      <table className="table w-full my-5">
        <thead>
          <tr className="text-md text-center  bg-gray-50 border rounded-3xl">
            <td className="py-3  font-semibold ">ชื่อหัวข้อ</td>
            <td className="p-3  font-semibold ">สถานะ</td>
            <td className="py-3  font-semibold ">ความคืบหน้า</td>
            <td className="p-3  font-semibold ">สมาชิก</td>
            <td className=""></td>
            <td className=""></td>
          </tr>
        </thead>
        <tbody>
          {group.map((item, idx) => {
            return (
              <tr className="hover:bg-blue-50 border-b-2 border-b-gray-300" key={item.id}>
                <td className=" py-2.5  ">
                  {item.title ? item.title : "ไม่มีชื่อหัวข้อ"}
                </td>
                <td>{item.status}</td>
                <td className="py-2.5  ">
                  <ProgressBar percent={Math.floor(Math.random() * 100)} />
                </td>
                <td>{null}</td>
                {ctx.role === "admin" ? (
                  <Fragment>
                    <td className="py-2.5  ">
                      <button 
                        onClick={() => clickDetailHandler(item.id)}
                        className="px-2 py-1  bg-green-600 hover:bg-green-500 rounded-lg text-white shadow-lg"
                      >
                        รายละเอียด
                      </button>
                    </td>
                    <td className="py-2.5 ">
                      <button
                        className="px-8 py-1  bg-red-600 hover:bg-red-500 rounded-lg text-white shadow-lg"
                        onClick={() => deleteGroupHandler(item.id)}
                      >
                        ลบ
                      </button>
                    </td>
                  </Fragment>
                ) : (
                  <td >
                    <button
                      onClick={() => clickDetailHandler(item.id)}
                      className="px-2 py-1   bg-green-600 hover:bg-green-500 rounded-lg text-white shadow-lg"
                    >
                      รายละเอียด
                    </button>
                  </td>
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
