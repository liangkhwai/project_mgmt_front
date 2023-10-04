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
          {group.length > 0 ? (
            group.map((grp, idx) => (
              <tr key={idx} className="border-b text-center">
                <td className="py-2.5">{idx + 1}</td>
                <td className="py-2.5">{grp.title}</td>
                <td className="py-2.5">
                  <ProgressBar progress={grp.progress} className="w-2/3" />
                </td>
                <td className="py-2.5">
                  <button
                    className="rounded-md bg-blue-500 px-5 py-2 text-white"
                    onClick={() => clickDetailHandler(grp.id)}
                  >
                    ดู
                  </button>
                </td>
                {ctx.role === "admin" ? (
                  <td className="py-2.5">
                    <button
                      className="rounded-md bg-red-500 px-5 py-2 text-white"
                      onClick={() => deleteGroupHandler(grp.id)}
                    >
                      ลบ
                    </button>
                  </td>
                ) : null}
              </tr>
            ))
          ) : (
            <tr className="border-b text-center">
              <td colSpan="5" className="py-2.5">
                ไม่มีรายการกลุ่มในขณะนี้
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GroupListBox;
