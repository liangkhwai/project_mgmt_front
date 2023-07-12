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

  return (
    <tr className="">
      <td className="border-2 py-1 ">{data.prefix}</td>
      <td className="border-2 py-1  ">{data.firstname}</td>
      <td className="border-2 py-1 ">{data.lastname}</td>
      <td className="border-2 py-1 ">{data.email}</td>
      <td className="border-2 py-1 ">{data.tel}</td>
      <td className="border-2 py-1 ">{data.line_id}</td>
      <td className="border-2 py-1">
        <UpdateButton onClick={() => editTchIdHandler(data.id, data)}>
          แก้ไข
        </UpdateButton>
      </td>
      <td className="border-2  py-1 ">
        <DeleteButton onClick={() => deleteFormDataHandler(data.id)}>
          ลบ
        </DeleteButton>
      </td>
    </tr>
  );
};

export default TeacherRow;
