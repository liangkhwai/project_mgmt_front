import React from "react";
import { DeleteButton } from "../../../../../UI/button";

const TableList = ({ rshList, setRshList }) => {
  console.log(rshList);

  const deleteRshHandler = (id) => {
    setRshList(rshList.filter((rsh) => rsh.student_id !== id));
  };

  return (
    <div>
      <table className="table w-full border border-gray-300 ">
        <thead className="">
          <tr className="h-10">
            <th className="">รหัสนักศึกษา</th>
            <th className="">ชื่อ</th>
            <th className="">นามสกุล</th>
            <th className="">เบอร์โทร</th>
            <th className="">E-mail</th>
            <th className="">เกรดเฉลี่ยเทอมล่าสุด</th>
            <th className="">ลบ</th>
          </tr>
        </thead>
        <tbody className=" ">
          {rshList.map((rsh, idx) => (
            <tr key={idx} className="odd:bg-gray-300 border-gray-300 ">
              <td className="">{rsh.student_id}</td>
              <td className="">{rsh.firstname}</td>
              <td className="">{rsh.lastname}</td>
              <td className="">{rsh.tel}</td>
              <td className="">{rsh.email}</td>
              <td className="">{rsh.grade}</td>
              <td className=" text-center">
                <DeleteButton onClick={() => deleteRshHandler(rsh.student_id)}>
                  ลบ
                </DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;
