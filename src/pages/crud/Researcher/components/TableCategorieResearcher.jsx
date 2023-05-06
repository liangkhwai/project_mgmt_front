import React, { useState } from "react";
import TableCategorieRow from "./TableCategorieRow";
import { AddButton } from "../../../../UI/button";

const TableCategorieResearcher = ({ dataRoomList }) => {
  console.log(dataRoomList)
  const [roomList, setRoomList] = useState(dataRoomList);
  return (
    <div className="bg-white rounded-2xl shadow-lg py-5 px-5 rounded-tl-none">
      <table className="table w-full border">
        <thead>
          <tr>
            <th>ห้อง</th>
            <th>หลักสูตร</th>
            <th>ปีการศึกษา</th>
            <th>แก้ไข</th>
            <th>ลบ</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {roomList.map((data, idx) => (
            <TableCategorieRow key={idx} data={data} />
          ))}
          {/* <TableCategorieRow /> */}
        </tbody>
      </table>
      <div className="flex justify-end">
        <AddButton>เพิ่มหมวดหมู่</AddButton>
      </div>
    </div>
  );
};

export default TableCategorieResearcher;
