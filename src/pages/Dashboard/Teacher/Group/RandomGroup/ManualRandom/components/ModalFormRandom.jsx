import React, { useState } from "react";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
const ModalFormRandom = ({
  editBoardGroup,
  teacherList,
  setGroupList,
  groupList,
  setIsOpen,
  setEditBoardGroup,
}) => {
  const defaultAdvsior = {
    id: 1,
    firstname: "",
    lastname: "",
    role: "advisor",
  };
  const defaultBoard1 = {
    id: 1,
    firstname: "",
    lastname: "",
    role: "board1",
  };
  const defaultBoard2 = {
    id: 1,
    firstname: "",
    lastname: "",
    role: "board2",
  };
  const [selectedAdvisor, setSelectedAdvisor] = useState(
    JSON.stringify(defaultAdvsior),
  );
  const [selectedBoard1, setSelectedBoard1] = useState(
    JSON.stringify(defaultBoard1),
  );
  const [selectedBoard2, setSelectedBoard2] = useState(
    JSON.stringify(defaultBoard2),
  );

  //   const changeBoardGroup = (board, teacher) => {
  //     teacher = JSON.parse(teacher);
  //     console.log(board, teacher);
  //     console.log(editBoardGroup);
  //     setEditBoardGroup((prevProject) => ({
  //       ...prevProject,
  //       boards: {
  //         ...prevProject.boards,
  //         [board]: {
  //           ...prevProject.boards[board],
  //           id: teacher.id,
  //           firstname: teacher.firstname,
  //           lastname: teacher.lastname,
  //         },
  //       },
  //     }));
  //     // setEditBoardGroup((prev) => {
  //     //   return {
  //     //     ...prev,
  //     //     boards: {
  //     //       ...prev.boards,
  //     //       [board]: {
  //     //         ...prev.boards[board],
  //     //         id: teacher.id,
  //     //         firstname: teacher.firstname,
  //     //         lastname: teacher.lastname,
  //     //       },
  //     //     },
  //     //   };
  //     // });
  //   };
  const changeBoardGroup = (board, teacher) => {
    const teacherObj = JSON.parse(teacher);
    console.log(board, teacherObj);

    try {
      setEditBoardGroup((prevProject) => ({
        ...prevProject,
        boards: {
          ...prevProject.boards,
          [board]: {
            ...prevProject.boards[board],
            id: teacherObj.id,
            firstname: teacherObj.firstname,
            lastname: teacherObj.lastname,
          },
        },
      }));
    } catch (error) {
      console.error("Error parsing teacher JSON:", error);
    }
  };
  const hasDuplicateIdInBoards = (project) => {
    const encounteredIds = new Set();

    for (const board in project.boards) {
      const boardId = project.boards[board].id;

      if (encounteredIds.has(boardId)) {
        return true; // Duplicate ID found
      } else {
        encounteredIds.add(boardId);
      }
    }

    return false; // No duplicate IDs found
  };
  const saveBoards = async (group) => {
    console.log(editBoardGroup);
    if (hasDuplicateIdInBoards(editBoardGroup)) {
      Swal.fire({
        icon: "error",
        title: "อาจารย์ที่ปรึกษา, ประธานสอบ, กรรมการสอบ มีการซ้ำกัน ",
        text: "กรุณาเปลี่ยนใหม่อีกครั้ง",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: true,
      });
    } else {
      const res = await fetch(
        "http://localhost:8080/boards/add/random/manual",
        {
          method: "POST",
          body: JSON.stringify({ grp: editBoardGroup }),
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await res.json();
      console.log(data);

      if (res.status === 200) {
        setGroupList((prev) =>
          prev.filter((group) => group.id !== editBoardGroup.id),
        );
        setIsOpen(false);
        Swal.fire({
          icon: "success",
          title: "บันทึกข้อมูลสำเร็จ",
          text: "บันทึกข้อมูลสำเร็จ",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: true,
        });
      }
    }
  };
  return (
    <div>
      <div className=" mb-10 flex justify-center  ">
        <div className="rounded-xl border bg-blue-100 p-3  text-xl">
          {editBoardGroup.title ? editBoardGroup.title : "ยังไม่ตั้งชื่อหัวข้อ"}
        </div>
      </div>

      <div className="">
        <div className="flex flex-col items-center  lg:flex-row  lg:justify-around">
          <div className="rounded-xl border bg-blue-100 p-5">
            <div className="text-center">อาจารย์ที่ปรึกษา</div>
            <select
              onChange={(e) => {
                changeBoardGroup("advisor", e.target.value);
                setSelectedAdvisor(e.target.value);
              }}
              value={selectedAdvisor}
              className="my-2 rounded-xl px-5 text-blue-900"
            >
              {teacherList.map((teacher) => (
                <option key={uuidv4()} value={JSON.stringify(teacher)}>
                  อาจารย์{teacher.firstname} {teacher.lastname}
                </option>
              ))}
            </select>
          </div>
          <div className="rounded-xl border bg-blue-100 p-5">
            <div className="text-center">ประธานกรรมการสอบ</div>
            <select
              onChange={(e) => {
                changeBoardGroup("board1", e.target.value);
                setSelectedBoard1(e.target.value);
              }}
              value={selectedBoard1}
              className="my-2 rounded-xl px-5 text-blue-900"
            >
              {teacherList.map((teacher) => (
                <option key={uuidv4()} value={JSON.stringify(teacher)}>
                  อาจารย์{teacher.firstname} {teacher.lastname}
                </option>
              ))}
            </select>
          </div>
          <div className="rounded-xl border bg-blue-100 p-5">
            <div className="text-center">กรรมการสอบ</div>
            <select
              onChange={(e) => {
                changeBoardGroup("board2", e.target.value);
                setSelectedBoard2(e.target.value);
              }}
              value={selectedBoard2}
              className="my-2 rounded-xl px-5 text-blue-900"
            >
              {teacherList.map((teacher) => (
                <option key={uuidv4()} value={JSON.stringify(teacher)}>
                  อาจารย์{teacher.firstname} {teacher.lastname}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className=" my-5 text-center">
          <button
            className="rounded-xl bg-green-500 px-4 py-2 text-center text-white hover:bg-green-700"
            onClick={() => saveBoards()}
          >
            บันทึก
          </button>
          &nbsp;
          <button
            className="rounded-xl bg-red-500 px-4 py-2 text-center text-white hover:bg-red-700"
            onClick={() => setIsOpen(false)}
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalFormRandom;
