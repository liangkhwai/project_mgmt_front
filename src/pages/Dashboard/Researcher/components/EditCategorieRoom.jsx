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
        <td className="py-1 border-2 border-gray-300">
          <input
            type="text"
            name="room"
            id=""
            value={data.room}
            onChange={(e) => editFormDataChangeHandler(e)}
          />
        </td>
        <td className="py-1 border-2 border-gray-300">
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
        <td className="py-1 border-2 border-gray-300">
          <input
            type="text"
            name="year"
            id=""
            value={data.year}
            onChange={(e) => editFormDataChangeHandler(e)}
          />
        </td>
        <td className="py-1 border-2 border-gray-300">
          <SaveButton onClick={editFormSubmitHandler}>บันทึก</SaveButton>
        </td>
        <td className="py-1 border-2 border-gray-300"> 
          <CancelButton onClick={cancelEditForm}>ยกเลิก</CancelButton>
        </td>
      </tr>
    </>
  );
};

export default EditCategorieRoom;
