import React from "react";
import { AddButton, CancelButton } from "../../../../UI/button";

const InsertCategorieRow = ({
  isInsertButtonHandler,
  insertFormDataHandler,
  insertFormDataSubmitHandler,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          name="room"
          id=""
          placeholder="ห้อง"
          onChange={(e) => insertFormDataHandler(e)}
        />
      </td>
      <td>
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
      <td>
        <input
          type="text"
          name="year"
          id=""
          placeholder="ปีการศึกษา"
          onChange={(e) => insertFormDataHandler(e)}
        />
      </td>
      <td>
        <AddButton onClick={insertFormDataSubmitHandler}>เพิ่ม</AddButton>
      </td>
      <td>
        <CancelButton onClick={isInsertButtonHandler}>ยกเลิก</CancelButton>
      </td>
    </tr>
  );
};

export default InsertCategorieRow;
