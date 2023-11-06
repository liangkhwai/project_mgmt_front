import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardInfo from "./BoardInfo";
const GroupRandomList = ({
  groupList,
  teacherList,
  setGroupList,
  setIsOpen,
  setEditBoardGroup,
  boardInfo,
  key,
}) => {
  const [researcherList, setResearcherList] = useState([]);

  useEffect(() => {
    const getResearcherList = async () => {
      const response = await fetch(`http://34.124.162.203:8080/researcher/list`, {
        method: "get",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setResearcherList(data);
    };
    getResearcherList();
  }, []);

  const navigate = useNavigate();
  const openEditModal = (group) => {
    console.log(group);
    setIsOpen(true);
    setEditBoardGroup({ ...group });
  };

  return (
    <div>
      <div className="mx-10">
        <div className="mb-5">
          <BoardInfo boardInfo={boardInfo} key={key} />
        </div>

        <div className="hidden lg:block">
          <div className="grid grid-cols-6 content-center py-1 text-center">
            <div className="flex w-full items-center justify-center bg-gray-200 py-4">
              ลำดับ
            </div>
            <div className="flex w-full items-center justify-center bg-gray-200 py-4">
              สมาชิก
            </div>
            <div className="flex w-full items-center justify-center bg-gray-200 py-4">
              เบอร์โทร
            </div>
            <div className="flex w-full items-center justify-center bg-gray-200 py-4">
              เกรด
            </div>
            <div className="flex w-full items-center justify-center bg-gray-200 py-4">
              หัวข้อ
            </div>
            <div className="flex w-full items-center justify-center bg-gray-200 py-4">
              บันทึกผลการสุ่ม
            </div>
          </div>
        </div>

        {groupList.length > 0 ? (
          groupList.map((group, idx) => (
            <Fragment key={idx}>
              <div className="grid grid-cols-6 content-center py-1 text-center lg:mx-0 lg:my-0">
                <div className="flex items-center  justify-center bg-gray-200">
                  {idx + 1}
                </div>
                <div className="grid grid-flow-row ">
                  {researcherList
                    .filter((item) => item.groupId === group.id)
                    .map((item) => (
                      <div className="bg-gray-200">
                        {item.firstname} {item.lastname}
                      </div>
                    ))}
                </div>
                <div className="grid grid-flow-row ">
                  {researcherList
                    .filter((item) => item.groupId === group.id)
                    .map((item) => (
                      <div className="bg-gray-200">{item.tel}</div>
                    ))}
                </div>
                <div className="grid grid-flow-row ">
                  {researcherList
                    .filter((item) => item.groupId === group.id)
                    .map((item) => (
                      <div className="bg-gray-200">{item.grade}</div>
                    ))}
                </div>
                <div
                  className="flex w-full cursor-pointer items-center justify-center bg-gray-200 py-4 text-center text-xl text-light-blue-700 hover:bg-gray-300"
                  onClick={() => navigate(`/dashboard/group/${group.id}`)}
                >
                  {group.title ? group.title : "ยังไม่ตั้งชื่อหัวข้อ"}
                </div>

                <div className="flex w-full items-center justify-center bg-gray-200 py-4 text-center">
                  <button
                    className="cursor-pointer rounded-xl bg-green-400 px-4 py-2 text-white hover:bg-green-700"
                    onClick={() => openEditModal(group)}
                  >
                    เรียกดู
                  </button>
                </div>
              </div>
            </Fragment>
          ))
        ) : (
          <div className="col-span-2  border bg-gray-200   py-2 text-center">
            ยังไม่มีรายการในขณะนี้
          </div>
        )}
      </div>

      {/* <table className="table w-full">
        <thead>
          <tr>
            <th>ชื่อหัวข้อ</th>
            <th>บันทึก</th>
          </tr>
        </thead>
        <tbody>
          {groupList.map((groupList, idx) => (
            <tr key={idx} className="">
              <td>{groupList.title}</td>
              <td>
                <button
                  onClick={() => setIsOpen(true)}
                  className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                >
                  บันทึก
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default GroupRandomList;
