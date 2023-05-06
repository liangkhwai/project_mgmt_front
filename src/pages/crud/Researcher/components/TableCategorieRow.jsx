import React, { useState } from "react";
import UpdateButton, { DeleteButton } from "../../../../UI/button";
const TableCategorieRow = ({ data }) => {
  return (
    <>
      <tr>
        <td>{data.room}</td>
        <td>{data.type}</td>
        <td>{data.year}</td>
        <td>
          {/* <button className="bg-yellow-300 rounded-sm px-5 py-1">แก้ไข</button> */}
          <UpdateButton>แก้ไข</UpdateButton>
        </td>
        <td>
          <DeleteButton>ลบ</DeleteButton>
          {/* <button className="bg-red-400 rounded-sm px-5 py-1">ลบ</button> */}
        </td>
      </tr>
    </>
  );
};

export default TableCategorieRow;
