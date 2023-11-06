import React, { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
const ModalFormRandom = ({
  editBoardGroup,
  teacherList,
  setGroupList,
  groupList,
  setIsOpen,
  setEditBoardGroup,
  setBoardInfo,
  setKey,
}) => {
  const [groupMember, setGroupMember] = useState([]);
  console.log(editBoardGroup);
  useEffect(() => {
    const getGroupMember = async () => {
      const response = await fetch(
        `http://34.124.162.203:8080/group/getGroupMember`,
        {
          method: "POST",
          body: JSON.stringify({ grpId: editBoardGroup.id }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );
      const data = await response.json();
      console.log(data);
      setGroupMember(data);
    };
    getGroupMember();
  }, []);

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
        "http://34.124.162.203:8080/boards/add/random/manual",
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
        setKey((prev) => prev + 1);
        const response = await fetch("http://34.124.162.203:8080/boards/info", {
          method: "get",
          credentials: "include",
        });
        const data = await response.json();
        setBoardInfo(data);
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
    <div className="">
      <div className=" mb-5 flex justify-center  ">
        <div className="   p-3  text-xl">
          {/* {editBoardGroup.title ? editBoardGroup.title : "ยังไม่ตั้งชื่อหัวข้อ"} */}
          บันทึกผลการสุ่ม
        </div>
      </div>
      <div className="mb-5 flex justify-center gap-5">
        <div className="flex justify-center  rounded-md bg-white outline outline-offset-[3px]  outline-cyan-200">
          <div className="flex flex-col">
            <div className="borderborder-b-black w-full border-s-transparent border-t-transparent py-5 text-center">
              รายชื่อนักศึกษาในกลุ่มโปรเจค
            </div>
            {groupMember.map((item, idx) => (
              <div key={item.id} className="my-1 w-72 rounded-xl p-5  ">
                <div>
                  <span className="px-5">{idx + 1}.</span>
                  {item.firstname} {item.lastname}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <div className="flex flex-col items-center    rounded-md bg-white outline outline-offset-[3px]  outline-cyan-200 lg:flex-col lg:justify-around">
            <div className="rounded-xl   p-5">
              <div className="text-center">อาจารย์ที่ปรึกษา</div>
              <select
                onChange={(e) => {
                  changeBoardGroup("advisor", e.target.value);
                  setSelectedAdvisor(e.target.value);
                }}
                value={selectedAdvisor}
                className="my-2 rounded-md px-5 text-blue-900"
              >
                {teacherList.map((teacher) => (
                  <option key={uuidv4()} value={JSON.stringify(teacher)}>
                    อาจารย์{teacher.firstname} {teacher.lastname}
                  </option>
                ))}
              </select>
            </div>
            <div className="rounded-md   p-5">
              <div className="text-center">ประธานกรรมการสอบ</div>
              <select
                onChange={(e) => {
                  changeBoardGroup("board1", e.target.value);
                  setSelectedBoard1(e.target.value);
                }}
                value={selectedBoard1}
                className="my-2 rounded-md px-5 text-blue-900"
              >
                {teacherList.map((teacher) => (
                  <option key={uuidv4()} value={JSON.stringify(teacher)}>
                    อาจารย์{teacher.firstname} {teacher.lastname}
                  </option>
                ))}
              </select>
            </div>
            <div className="rounded-xl   p-5">
              <div className="text-center">กรรมการสอบ</div>
              <select
                onChange={(e) => {
                  changeBoardGroup("board2", e.target.value);
                  setSelectedBoard2(e.target.value);
                }}
                value={selectedBoard2}
                className="my-2 rounded-md px-5 text-blue-900"
              >
                {teacherList.map((teacher) => (
                  <option key={uuidv4()} value={JSON.stringify(teacher)}>
                    อาจารย์{teacher.firstname} {teacher.lastname}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className=" pb-5 text-center">
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
  );
};

export default ModalFormRandom;
