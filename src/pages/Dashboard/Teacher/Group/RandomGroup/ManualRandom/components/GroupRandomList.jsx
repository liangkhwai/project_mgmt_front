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
       
        {
          groupList.length > 0 ? (
            groupList.map((group, idx) => (
              <Fragment key={idx}>
                <div className="bg-white shadow-md rounded-md p-5 mx-8 my-5 lg:mx-0 lg:my-0">
                  <div className="flex justify-between">
                    <div className="text-xl">{group.title}</div>
                    <div
                      className="text-white cursor-pointer bg-green-400 rounded-xl px-4 py-2"
                      onClick={() => openEditModal(group)}
                    >
                      เปิด
                    </div>
                  </div>  
                  
                </div>
              </Fragment>
            ))
          ) : (
            <div className="text-center font-bold text-xl p-5 border rounded-xl my-5 border-black">ไม่มีรายการกลุ่มในขณะนี้</div>
          )
        }


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
