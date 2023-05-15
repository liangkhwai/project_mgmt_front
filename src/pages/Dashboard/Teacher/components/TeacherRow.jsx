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
    <tr>
      <td>{data.prefix}</td>
      <td>{data.firstname}</td>
      <td>{data.lastname}</td>
      <td>{data.email}</td>
      <td>{data.tel}</td>
      <td>{data.line_id}</td>
      <td>
        <UpdateButton onClick={() => editTchIdHandler(data.id, data)}>
          แก้ไข
        </UpdateButton>
      </td>
      <td>
        <DeleteButton onClick={()=>deleteFormDataHandler(data.id)}>ลบ</DeleteButton>
      </td>
    </tr>
  );
};

export default TeacherRow;
