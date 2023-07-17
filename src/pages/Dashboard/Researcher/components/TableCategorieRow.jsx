import React, { useState } from "react";
import UpdateButton, { DeleteButton } from "../../../../UI/button";
const TableCategorieRow = ({ data, getRoomId,deleteFormDataHandler }) => {
  
  return (
    <>
      <tr>
        <td className="py-1 border-2 border-gray-300">{data.room}</td>
        <td className="py-1 border-2 border-gray-300">{data.type}</td>
        <td className="py-1 border-2 border-gray-300">{data.year}</td>
        <td className="py-1 border-2 border-gray-300">
          {/* <button className="bg-yellow-300 rounded-sm px-5 py-1">แก้ไข</button> */}
          <UpdateButton onClick={()=>getRoomId(data)}>แก้ไข</UpdateButton>
        </td>
        <td className="py-1 border-2 border-gray-300">
          <DeleteButton onClick={()=>deleteFormDataHandler(data.id)}>ลบ</DeleteButton>
          {/* <button className="bg-red-400 rounded-sm px-5 py-1">ลบ</button> */}
        </td>
      </tr>
    </>
  );
};

export default TableCategorieRow;
