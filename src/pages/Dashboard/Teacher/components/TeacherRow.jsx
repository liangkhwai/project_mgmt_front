import React from "react";
import UpdateButton, { DeleteButton } from "../../../../UI/button";

const TeacherRow = ({
  data,
  setEditId,
  setEditFormData,
  deleteFormDataHandler,
}) => {
  const editTchIdHandler = (id, data) => {
    console.log(id);
    setEditId(id);
    setEditFormData(data);
  };

  console.log(data);

  return (
    <tr className="">
      <td className="border py-1 border-gray-300 ">{data.prefix}</td>
      <td className="border py-1 border-gray-300 ">{data.firstname}</td>
      <td className="border py-1 border-gray-300">{data.lastname}</td>
      <td className="border py-1 border-gray-300">{data.email}</td>
      <td className="border py-1 border-gray-300">{data.tel}</td>
      <td className="border py-1 border-gray-300">{data.line_id}</td>
      <td className="border py-1 border-gray-300">
        <input
          type="color"
          className="rounded-lg"
          name="color_calendar"
          value={data.color_calendar}
          id=""
          onChange={(e) => console.log(e)}
          disabled
        />
      </td>
      <td className="border py-1 border-gray-300">
        <input type="checkbox" name="" id="" checked={data.isAdmin} disabled  className="rounded-sm"/>
      </td>
      <td className="border py-1 border-gray-300">
        <UpdateButton onClick={() => editTchIdHandler(data.id, data)}>
          แก้ไข
        </UpdateButton>
      </td>
      <td className="border  py-1 border-gray-300">
        <DeleteButton onClick={() => deleteFormDataHandler(data.id)}>
          ลบ
        </DeleteButton>
      </td>
    </tr>
  );
};

export default TeacherRow;
