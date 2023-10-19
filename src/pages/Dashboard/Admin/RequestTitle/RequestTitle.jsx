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
        "http://34.126.100.66:8080/group/unApproveTitle",
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
          `http://34.126.100.66:8080/group/approveTitle/${id}`,
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
        <div className="grid grid-cols-5 content-center py-1 text-center">
          <div className="flex w-full items-center justify-center bg-light-blue-200 py-4">
            ลำดับ
          </div>
          <div className="flex w-full items-center justify-center bg-light-blue-200 py-4">
            ชื่อหัวข้อ
          </div>
          <div className="flex w-full items-center justify-center bg-light-blue-200 py-4">
            สถานะ
          </div>
          <div className="flex w-full items-center justify-center bg-light-blue-200 py-4">
            อนุมัติ
          </div>
          <div className="flex w-full items-center justify-center bg-light-blue-200 py-4">
            ไม่อนุมัติ
          </div>
        </div>
        {groupList.length > 0 ? (
          groupList.map((group, index) => (
            <div
              key={group.id}
              className="grid grid-cols-5 content-center py-1 text-center"
            >
              <div className="flex w-full items-center justify-center py-4">
                {index + 1}
              </div>
              <div
                onClick={() => navigate(`/dashboard/group/${group.id}`)}
                className="flex w-full cursor-pointer items-center justify-center py-4 text-light-blue-700 hover:bg-gray-100"
              >
                {group.title}
              </div>
              <div className="flex w-full items-center justify-center py-4">
                {group.status}
              </div>
              <div className="flex w-full items-center justify-center py-4">
                <button
                  className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                  onClick={() => approveTitle(group.id, true)}
                >
                  อนุมัติ
                </button>
              </div>
              <div className="flex w-full items-center justify-center py-4">
                <button
                  className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                  onClick={() => approveTitle(group.id, false)}
                >
                  ไม่อนุมัติ
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-5 flex w-full items-center justify-center bg-gray-200 py-4">
            ยังไม่มีรายการในขณะนี้
          </div>
        )}
      </Body>
    </div>
  );
};

export default RequestTitle;
