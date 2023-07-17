import React from "react";
import UpdateButton, { DeleteButton } from "../../../../UI/button";

const ResearcherList = ({ rsh, setEditRshIdHandler, deleteHandler }) => {
  // console.log(rsh);

  return (
    <tr className="text-center ">
      <td className="py-1 border-2 border-gray-300">{rsh.student_id}</td>
      <td className="py-1 border-2 border-gray-300">{rsh.firstname}</td>
      <td className="py-1 border-2 border-gray-300">{rsh.lastname}</td>
      <td className="py-1 border-2 border-gray-300">{rsh.categorie_room.room}</td>
      <td className="py-1 border-2 border-gray-300">{rsh.email}</td>
      <td className="py-1 border-2 border-gray-300">{rsh.tel}</td>
      <td className="py-1 border-2 border-gray-300">{rsh.grade}</td>
      <td className="py-1 border-2 border-gray-300"> 
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
      <td className="py-1 border-2 border-gray-300">
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
