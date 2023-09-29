import React from "react";
import { Fragment } from "react";

const GroupRandomList = ({
  groupList,
  teacherList,
  setGroupList,
  setIsOpen,
  setEditBoardGroup,
}) => {
  const openEditModal = (group) => {
    console.log(group);
    setIsOpen(true);
    setEditBoardGroup({...group});
  };

  return (
    <div>
      <div className="mx-10">
        <div className="mx-8 hidden lg:block">
          <div className="flex justify-between">
            <div className="">ชื่อหัวข้อ</div>
            <div className="">เปิด</div>
          </div>
        </div>
        {groupList.map((item) => {
          return (
            <Fragment key={item.id}>
              <div className="my-5 flex flex-col items-center  gap-3 rounded-xl  border p-3 lg:flex-row lg:justify-between">
                <div className="w-full   ">{item.title}</div>
                <div>
                  <button
                    onClick={() => openEditModal(item)}
                    className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                  >
                    เปิด
                  </button>
                </div>
              </div>
            </Fragment>
          );
        })}
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
