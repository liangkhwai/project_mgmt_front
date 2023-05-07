import React from "react";
import UpdateButton, { DeleteButton } from "../../../../UI/button";

const ResearcherList = ({ rsh, setEditRshIdHandler, deleteHandler }) => {
  console.log(rsh);

  return (
    <tr className="text-center">
      <td>{rsh.student_id}</td>
      <td>{rsh.firstname}</td>
      <td>{rsh.lastname}</td>
      <td>{rsh.categorie_room.room}</td>
      <td>{rsh.email}</td>
      <td>{rsh.tel}</td>
      <td>{rsh.grade}</td>
      <td>
        <UpdateButton onClick={() => setEditRshIdHandler(rsh.id, rsh)}>
          แก้ไข
        </UpdateButton>
        {/* <button
          className="px-3 py-2 rounded bg-yellow-400 text-black"
          onClick={() => setEditRshIdHandler(rsh.id, rsh)}
        >
          แก้ไข
        </button> */}
      </td>
      <td>
        <DeleteButton onClick={() => deleteHandler(rsh.id)}>ลบ</DeleteButton>
        {/* <button
          className="px-3 py-2 rounded bg-red-500 text-black"
          onClick={() => deleteHandler(rsh.id)}
        >
          ลบ
        </button> */}
      </td>
    </tr>
  );
};

export default ResearcherList;
