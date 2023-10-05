import React, { useEffect, useState, Fragment } from "react";
import { useQuery } from "react-query";
import { useLoaderData, useParams } from "react-router-dom";
import GroupMemberList from "./GroupMemberList";
import ExamRequestBox from "../../../../Researcher/Group/components/ExamRequestBox";
import BoardList from "../../../../Researcher/Group/components/BoardList";
import Body from "../../../../../../UI/Body";
import Title from "../../../../../../UI/Title";
import { useContext } from "react";
import AuthContext from "../../../../../../context/auth";
import ReactModal from "react-modal";
import AddButton, { SaveButton } from "../../../../../../UI/button";
import { BiArrowBack } from "react-icons/bi";
const GroupDetail = () => {
  const ctx = useContext(AuthContext);
  const getGroupDetail = useLoaderData();
  const [grpDetail, setGrpDetail] = useState(getGroupDetail);
  const [boards, setBoards] = useState([]);
  const [requestExam, setRequestExam] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);
  let { grpId } = useParams();
  const [editBoard, setEditBoard] = useState([]);
  const [isDupeBoard, setIsDupeBoard] = useState(false);

  useEffect(() => {
    const fetchBoards = async () => {
      const res = await fetch(`http://localhost:8080/boards/get/${grpId}`, {
        method: "get",
      });
      const data = await res.json();
      console.log(data);
      setBoards(data);
      setEditBoard(data);
    };

    const fetchRequestExam = async () => {
      const res = await fetch(
        `http://localhost:8080/requestExam/getRequestGroup/${grpId}`,
        {
          method: "GET",
        },
      );
      const data = await res.json();
      console.log(data);
      setRequestExam(data.slice(0, 3));
    };

    const fetchTeacherList = async () => {
      const res = await fetch("http://localhost:8080/teachers/list", {
        method: "GET",
      });

      const data = await res.json();
      console.log(data);
      setTeachers(data);
    };

    fetchBoards();

    fetchRequestExam();
    fetchTeacherList();
  }, []);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const findRole = (role) => {
    if (role === "advisor") {
      return "อาจารย์ที่ปรึกษา";
    } else if (role === "board1") {
      return "ประธานกรรมการสอบ";
    } else {
      return "กรรมการสอบ";
    }
  };
  const changeEditBoardHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    const testEdit = editBoard.map((teacher) =>
      teacher.role === name
        ? { ...teacher, teacherId: parseInt(value) }
        : teacher,
    );
    console.log(testEdit);
    setEditBoard(testEdit);

    // setEditBoard(prevTeachers =>
    //   prevTeachers.map(teacher =>
    //     teacher.role === name ? { ...teacher, teacherId: value } : teacher
    //   )
    // );
  };
  console.log(editBoard);
  const hasDuplicateTeacherId = editBoard.some(
    (teacher, index, array) =>
      array.findIndex((t) => t.teacherId === teacher.teacherId) !== index,
  );

  const controlOpenModalHandler = () => {
    if (ctx.role === "teacher") {
      return;
    }

    setIsModalOpen(true);
    setEditBoard(boards);
  };
  useEffect(() => {
    const hasDuplicateTeacherId = editBoard.some(
      (teacher, index, array) =>
        array.findIndex((t) => t.teacherId === teacher.teacherId) !== index,
    );

    if (hasDuplicateTeacherId) {
      setIsDupeBoard(true);
    } else {
      setIsDupeBoard(false);
    }
  }, [editBoard]);
  ReactModal.setAppElement("#root");

  const updateBoardSubmitHandler = async () => {
    const res = await fetch("http://localhost:8080/boards/updateBoard", {
      method: "PUT",
      body: JSON.stringify({ updatedBoard: editBoard, grpId: grpId }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log(data);
    setBoards(data);
    setIsModalOpen(false);
  };

  return (
    <div className="mx-10" id="grpDetailApp">
      <Title>
        <div className="flex items-center gap-5">
          <button
            className="hover:text-light-blue-700 "
            onClick={() => window.history.back()}
          >
            <BiArrowBack />
          </button>
          รายละเอียดกลุ่มโปรเจค
        </div>
      </Title>
      <Body>
        <GroupMemberList
          grpDetail={grpDetail}
          setGrpDetail={setGrpDetail}
          grpId={grpId}
        />
        <div className="my-3 grid grid-cols-12 gap-2">
          <div className="col-span-8  w-full rounded-xl border shadow-md">
            <ExamRequestBox requestExam={requestExam} />
          </div>
          <div
            className={
              ctx.role === "admin"
                ? "col-span-4 w-full rounded-xl border shadow-md hover:cursor-pointer hover:bg-gray-200"
                : "col-span-4 w-full rounded-xl border shadow-md "
            }
            onClick={() => controlOpenModalHandler()}
          >
            {boards.length > 0 ? (
              <div className="flex flex-col">
                {<BoardList boards={boards} />}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                รอผู้ดูแลระบบสุ่ม
              </div>
            )}
          </div>
        </div>
      </Body>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <div className="py-3 text-center text-2xl">
            แก้ไขรายชื่อกรรมการสอบ
          </div>
          {boards.map((item, idx) => (
            <Fragment key={item.id}>
              <div className="flex justify-between border-b py-5">
                <div className="px-5">{findRole(item.role)}</div>
                <div className="px-5">
                  <select
                    id=""
                    defaultValue={item.id}
                    onChange={(e) => changeEditBoardHandler(e)}
                    name={item.role}
                  >
                    {teachers.map((tch, idx) => (
                      <option key={tch.id} value={tch.id}>
                        {tch.firstname} {tch.lastname}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Fragment>
          ))}
          {hasDuplicateTeacherId && (
            <div className="py-3 text-center font-bold text-red-500">
              **กรุณาเลือกกรรมการสอบที่ไม่ซ้ำกัน**
            </div>
          )}
          <div className="mt-5 text-center">
            <button
              className="rounded-md bg-green-400 px-3 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50 hover:bg-green-600"
              disabled={isDupeBoard}
              onClick={updateBoardSubmitHandler}
            >
              บันทึก
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default GroupDetail;
