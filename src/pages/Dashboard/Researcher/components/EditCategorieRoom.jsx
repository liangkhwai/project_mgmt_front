import React from "react";
import { CancelButton, SaveButton } from "../../../../UI/button";

const EditCategorieRoom = ({
  data,
  cancelEditForm,
  editFormDataChangeHandler,
  editFormSubmitHandler,
}) => {
  return (
    <>
      <tr>
        <td>
          <input
            type="text"
            name="room"
            id=""
            value={data.room}
            onChange={(e) => editFormDataChangeHandler(e)}
          />
        </td>
        <td>
          <select
            name="type"
            id=""
            value={data.type}
            onChange={(e) => editFormDataChangeHandler(e)}
          >
            <option value="N" defaultChecked>
              N
            </option>
            <option value="R">R</option>
            <option value="Q">Q</option>
          </select>
          {/* <input type="text" name="" id="" /> */}
        </td>
        <td>
          <input
            type="text"
            name="year"
            id=""
            value={data.year}
            onChange={(e) => editFormDataChangeHandler(e)}
          />
        </td>
        <td>
          <SaveButton onClick={editFormSubmitHandler}>บันทึก</SaveButton>
        </td>
        <td>
          <CancelButton onClick={cancelEditForm}>ยกเลิก</CancelButton>
        </td>
      </tr>
    </>
  );
};

export default EditCategorieRoom;
