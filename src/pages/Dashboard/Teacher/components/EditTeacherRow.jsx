import React from "react";
import { CancelButton, SaveButton } from "../../../../UI/button";
const EditTeacherRow = ({
  dataEdit,
  cancelEdit,
  setEditFormData,
  editFormDataSubmitHandler,
}) => {
  const editFormDataChangeHandler = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    if (name === "isAdmin") {
      setEditFormData((prev) => ({ ...prev, [name]: e.target.checked }));
      return;
    } else {
      setEditFormData((prev) => ({ ...prev, [name]: val }));
    }
  };

  const cancelEditIdHandler = () => {
    cancelEdit(null);
  };

  return (
    <tr className="text-center ">
      <td>
        <input
          type="text"
          name="prefix"
          id=""
          className="w-full rounded-lg"
          value={dataEdit.prefix}
          onChange={(e) => editFormDataChangeHandler(e)}
        />
      </td>
      <td>
        <input
          type="text"
          name="firstname"
          id=""
          className="w-full rounded-lg"
          value={dataEdit.firstname}
          onChange={(e) => editFormDataChangeHandler(e)}
        />
      </td>
      <td>
        <input
          type="text"
          name="lastname"
          id=""
          className="w-full rounded-lg"
          value={dataEdit.lastname}
          onChange={(e) => editFormDataChangeHandler(e)}
        />
      </td>
      <td>
        <input
          type="text"
          name="email"
          id=""
          className="w-full rounded-lg"
          value={dataEdit.email}
          onChange={(e) => editFormDataChangeHandler(e)}
        />
      </td>
      <td>
        <input
          type="text"
          name="tel"
          id=""
          className="w-full rounded-lg"
          value={dataEdit.tel}
          onChange={(e) => editFormDataChangeHandler(e)}
        />
      </td>
      <td>
        <input
          type="text"
          name="line_id"
          id=""
          className="w-full rounded-lg"
          value={dataEdit.line_id}
          onChange={(e) => editFormDataChangeHandler(e)}
        />
      </td>
      <td>
        <input
        className="rounded-md"
          type="color"
          name="color_calendar"
          value={dataEdit.color_calendar}
          id=""
          onChange={(e) => editFormDataChangeHandler(e)}
        />
      </td>
      <td>
        <input
        className="rounded-sm"
          type="checkbox"
          name="isAdmin"
          id=""
          checked={dataEdit.isAdmin}
          onChange={(e) => editFormDataChangeHandler(e)}
        />
      </td>

      <td className="border-2 px-5 py-1">
        <SaveButton onClick={() => editFormDataSubmitHandler()}>
          บันทึก
        </SaveButton>
      </td>
      <td className="border-2 px-5 py-1">
        <CancelButton onClick={() => cancelEditIdHandler()}>
          ยกเลิก
        </CancelButton>
      </td>
    </tr>
  );
};

export default EditTeacherRow;
