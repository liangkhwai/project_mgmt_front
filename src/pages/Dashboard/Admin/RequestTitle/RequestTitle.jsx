import React, { useState } from "react";
import Title from "../../../../UI/Title";
import Body from "../../../../UI/Body";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RequestTitle = () => {
  const [groupList, setGroupList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getGroupList = async () => {
      const groupListFromServer = await fetch(
        "http://localhost:8080/group/unApproveTitle",
        {
          method: "GET",
        },
      );
      const data = await groupListFromServer.json();
      console.log(data);

      setGroupList(data);
    };
    getGroupList();
  }, []);

  const approveTitle = async (id, res) => {
    const resultTch = res;
    console.log(resultTch);
    Swal.fire({
      title: `คุณต้องการ${res ? "อนุมัติ" : "ไม่อนุมัติ"}หัวข้อนี้ใช่หรือไม่?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(result);
        const res = await fetch(
          `http://localhost:8080/group/approveTitle/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ result: resultTch }),
          },
        );
        const data = await res.json();
        console.log(data);
        if (res.status === 200) {
          setGroupList(groupList.filter((group) => group.id !== id));
          Swal.fire({
            title: "สำเร็จ",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "อนุมัติหัวข้อไม่สำเร็จ",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="mx-10">
      <Title>รายการอนุมัติหัวข้อ</Title>

      <Body>
        <table className="table w-full">
          <thead>
            <tr>
              <td>ลำดับ</td>
              <td>ชื่อหัวข้อ</td>
              <td>สถานะ</td>
              <td>อนุมัติ</td>
              <td>ไม่อนุมัติ</td>
            </tr>
          </thead>
          <tbody>
            {groupList.length > 0 ? (
              groupList.map((group, index) => (
                <tr key={group.id}>
                  <td>{index + 1}</td>
                  <td
                    onClick={() => navigate(`/dashboard/group/${group.id}`)}
                    className="cursor-pointer hover:bg-gray-100 text-light-blue-700"
                  >
                    {group.title}
                  </td>
                  <td>{group.status}</td>
                  <td>
                    <button
                      className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                      onClick={() => approveTitle(group.id, true)}
                    >
                      อนุมัติ
                    </button>
                  </td>
                  <td>
                    <button
                      className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                      onClick={() => approveTitle(group.id, false)}
                    >
                      ไม่อนุมัติ
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan="5" className="py-5 text-xl font-bold ">
                  ยังไม่มีรายการในขณะนี้
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Body>
    </div>
  );
};

export default RequestTitle;
