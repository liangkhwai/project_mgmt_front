import React from "react";
import { AddButton, CancelButton } from "../../../../UI/button";

const InsertCategorieRow = ({
  isInsertButtonHandler,
  insertFormDataHandler,
  insertFormDataSubmitHandler,
}) => {
  return (
    <tr >
      <td className="py-1 border-b-2 border-l-2 border-gray-300 ">
        <input
          type="text"
          name="room"
          id=""
          placeholder="ห้อง"
          onChange={(e) => insertFormDataHandler(e)}
        />
      </td>
      <td className="py-1 border-2 border-gray-300">
        <select
          name="type"
          id=""
          defaultValue="N"
          onChange={(e) => insertFormDataHandler(e)}
        >
          <option value="N" defaultChecked>
            N
          </option>
          <option value="R">R</option>
          <option value="Q">Q</option>
        </select>
      </td>
      <td className="py-1 border-b-2 border-gray-300">
        <input
          type="text"
          name="year"
          id=""
          placeholder="ปีการศึกษา"
          onChange={(e) => insertFormDataHandler(e)}
        />
      </td>
      <td className="py-1 border-2 border-gray-300">
        <AddButton onClick={insertFormDataSubmitHandler}>เพิ่ม</AddButton>
      </td>
      <td className="py-1 border-2 border-gray-300">
        <CancelButton onClick={isInsertButtonHandler}>ยกเลิก</CancelButton>
      </td>
    </tr>
  );
};

export default InsertCategorieRow;
