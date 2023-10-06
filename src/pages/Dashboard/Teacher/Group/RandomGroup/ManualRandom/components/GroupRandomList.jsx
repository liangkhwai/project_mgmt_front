import React from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import BoardInfo from "./BoardInfo";
const GroupRandomList = ({
  groupList,
  teacherList,
  setGroupList,
  setIsOpen,
  setEditBoardGroup,
}) => {
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
          <BoardInfo />
        </div>

        <div className="hidden lg:block">
          <div className="grid grid-cols-2 content-center py-1 text-center">
            <div className="flex w-full items-center justify-center bg-gray-200 py-4">
              ชื่อหัวข้อ
            </div>
            <div className="flex w-full items-center justify-center bg-gray-200 py-4">
              เปิด
            </div>
          </div>
        </div>

        {groupList.length > 0 ? (
          groupList.map((group, idx) => (
            <Fragment key={idx}>
              <div className="grid grid-cols-2 content-center py-1 text-center lg:mx-0 lg:my-0">
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
                    เปิด
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
