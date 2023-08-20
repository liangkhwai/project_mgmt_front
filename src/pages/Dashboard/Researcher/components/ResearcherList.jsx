import React from "react";
import UpdateButton, { DeleteButton } from "../../../../UI/button";

const ResearcherList = ({
  rsh,
  setEditRshIdHandler,
  deleteHandler,
  setRshList,
  idx
}) => {
  // console.log(rsh);
  const check = false;

  const editGradeProjectHandler = async (rsh) => {
    const gradeProjectValue = prompt(
      "การแก้ไขเกรดโปรเจคนี้สามารถแก้ได้ครั้งเดียว"
    );

    if (gradeProjectValue === null || gradeProjectValue === undefined) {
      return;
    }

    const res = await fetch("http://localhost:8080/researcher/updateGradePro", {
      method: "put",
      body: JSON.stringify({ gradeProject: gradeProjectValue, rshId: rsh.id }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.status === 200) {
        setRshList((prev) => {
          const index = prev.findIndex((item, idx) => item.id === rsh.id);

          const updateState = [...prev];
          updateState[index].grade_project = gradeProjectValue;
          updateState[index].isEditGradeProject = true;

          return updateState;
        });
      }
    });
  };
  const notEdtAgainHandler = () => {
    alert("ไม่สามารถแก้ไขได้");
  };
  console.log(rsh);
  return (
    <tr className="text-center ">
      <td className="py-1 border-2 border-gray-300">{idx+1}</td>

      <td className="py-1 border-2 border-gray-300">{rsh.student_id}</td>
      <td className="py-1 border-2 border-gray-300">{rsh.firstname}</td>
      <td className="py-1 border-2 border-gray-300">{rsh.lastname}</td>
      <td className="py-1 border-2 border-gray-300">
        {rsh.categorie_room.room}
      </td>
      <td className="py-1 border-2 border-gray-300">{rsh.email}</td>
      <td className="py-1 border-2 border-gray-300">{rsh.tel}</td>
      <td className="py-1 border-2 border-gray-300">{rsh.grade}</td>
      {/* <td className="py-1 border-2 border-gray-300">{rsh.group.id}</td> */}
      <td className="py-1 border-2 border-gray-300">
        {rsh.group ? rsh.group.status : "ยังไม่สอบหัวข้อ"}
      </td>

      <td
        className="py-1 border-2 border-gray-300 bg-yellow-300 hover:bg-red-400 cursor-pointer"
        onClick={() => {
          rsh.isEditGradeProject
            ? notEdtAgainHandler()
            : editGradeProjectHandler(rsh);
        }}
      >
        {rsh.grade_project}
      </td>

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
