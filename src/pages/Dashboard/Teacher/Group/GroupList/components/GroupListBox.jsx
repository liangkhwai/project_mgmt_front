import React, { Fragment, useEffect, useState, useContext } from "react";
import ProgressBar from "../../../../../../UI/ProgressBar";
import AuthContext from "../../../../../../context/auth";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
          "Failed to delete the group. It is referenced by other records.",
        );
      }
      return await response.json();
    },
    onSuccess: (data) => {
      setGroup(group.filter((item) => item.id !== parseInt(data)));
      Swal.fire("ลบ!", "ลบข้อมูลกลุ่มเรียบร้อยแล้ว", "success");
    },
    onError: (data) => {
      Swal.fire(
        "Error",
        "ไม่สามารถลบได้ เนื่องจากกลุ่มนี้มีการดำเนินการแล้ว",
        "error",
      );
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
    },
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
    Swal.fire({
      title: "ลบ?",
      text: "คุณต้องการลบข้อมูลนี้หรือไม่!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบ!",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteGroup.mutate(grpId);
      }
    });
  };
  return (
    <div>
      <table className="my-5 table w-full">
        <thead>
          <tr className="text-md rounded-3xl  border bg-gray-50 text-center">
            <td>ลำดับ</td>
            <td className="py-3  font-semibold ">ชื่อหัวข้อ</td>
            <td className="">ความคืบหน้า</td>
            {ctx.role === "admin" ? (
              <Fragment>
                <td className="py-2.5  ">รายละเอียด</td>
                <td className="py-2.5 ">ลบ</td>
              </Fragment>
            ) : (
              <td>รายละเอียด</td>
            )}
          </tr>
        </thead>
        <tbody>
          {group.map((item, idx) => {
            return (
              <tr
                className="border-b-2 border-b-gray-300 hover:bg-blue-50"
                key={item.id}
              >
                <td className="">{idx + 1}</td>
                <td className=" py-2.5  ">
                  {item.title ? item.title : "ไม่มีชื่อหัวข้อ"}
                </td>
                {/* <td>{item.status}</td> */}
                <td className="py-2.5  ">
                  <ProgressBar percent={Math.floor(Math.random() * 100)} />
                </td>
                {/* <td>{null}</td> */}
                {ctx.role === "admin" ? (
                  <Fragment>
                    <td className="py-2.5 text-center ">
                      <button
                        onClick={() => clickDetailHandler(item.id)}
                        className="rounded-lg bg-green-600  px-2 py-1 text-white shadow-lg hover:bg-green-500"
                      >
                        รายละเอียด
                      </button>
                    </td>
                    <td className="py-2.5 text-center">
                      <button
                        className="rounded-lg bg-red-600  px-8 py-1 text-white shadow-lg hover:bg-red-500"
                        onClick={() => deleteGroupHandler(item.id)}
                      >
                        ลบ
                      </button>
                    </td>
                  </Fragment>
                ) : (
                  <td>
                    <button
                      onClick={() => clickDetailHandler(item.id)}
                      className="rounded-lg bg-green-600   px-2 py-1 text-white shadow-lg hover:bg-green-500"
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
