import React from "react";
import { useEffect, useState } from "react";
import Title from "../../../../../../UI/Title";
import Body from "../../../../../../UI/Body";
import FormRandomList from "./components/FormRandomList";
import GroupRandomList from "./components/GroupRandomList";
import Modal from "react-modal";
import ModalFormRandom from "./components/ModalFormRandom";

const Random = () => {
  const [teacherList, setTeacherList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editBoardGroup, setEditBoardGroup] = useState();
  const [key, setKey] = useState(0);
   const [boardInfo, setBoardInfo] = useState([]);
   useEffect(() => {
     const getBoardInfo = async () => {
       const response = await fetch("http://34.124.162.203:8080/boards/info", {
         method: "get",
         credentials: "include",
       })
       const data = await response.json();
       console.log(data);
       setBoardInfo(data);
     };
     getBoardInfo();
   }, []);
  useEffect(() => {
    const getTeacherList = async () => {
      const response = await fetch("http://34.124.162.203:8080/teachers/list", {
        method: "get",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setTeacherList(data);
    };
    const getGroupList = async () => {
      const response = await fetch(
        "http://34.124.162.203:8080/group/getAllGroup/random",
        {
          method: "get",
          credentials: "include",
        },
      );
      const data = await response.json();

      console.log(data);
      setGroupList(
        data.map((obj) => {
          return {
            ...obj,
            boards: {
              advisor: { role: "advisor", id: 1, firstname: "", lastname: "" },
              board1: { role: "board1", id: 1, firstname: "", lastname: "" },
              board2: { role: "board2", id: 1, firstname: "", lastname: "" },
            },
          };
        }),
      );
    };
    getTeacherList();
    getGroupList();
  }, []);

  const closeModalHandle = () => {
    setIsOpen(false);
  };
  Modal.setAppElement("#root");
  return (
    <div className="mx-10">
      <Title>บันทึกผลการสุ่ม</Title>
      <Body>
        {/* <FormRandomList
          groupList={groupList}
          teacherList={teacherList}
          setGroupList={setGroupList}
        /> */}
        <GroupRandomList
          setIsOpen={setIsOpen}
          setGroupList={setGroupList}
          teacherList={teacherList}
          groupList={groupList}
          setEditBoardGroup={setEditBoardGroup}
          boardInfo={boardInfo}
          key={key}
        />
        <Modal
          isOpen={isOpen}
          onRequestClose={() => closeModalHandle()}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              width: "auto",
              height: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#d2e8fa",
              borderRadius: "30px",
              border: "none",
            },
          }}
        >
          <ModalFormRandom
            editBoardGroup={editBoardGroup}
            teacherList={teacherList}
            setGroupList={setGroupList}
            groupList={groupList}
            setIsOpen={setIsOpen}
            setEditBoardGroup={setEditBoardGroup}
            setBoardInfo={setBoardInfo}
            setKey={setKey}
          />
        </Modal>
      </Body>
    </div>
  );
};

export default Random;
