import React, { Fragment, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { SaveButton } from "../../../../../../UI/button";
import { v4 } from "uuid";

const FormRandom = ({ teacher, setTeacher, group, setGroup, setIsRamdom }) => {
  const [isDisable, setIsDisable] = useState(true);
  // console.log(teacher);
  // console.log(group);
  const changeLimitHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    let teacherTmp = [...teacher];
    const indexTeacher = teacherTmp.findIndex(
      (item) => item.firstname === name
    );
    teacherTmp[indexTeacher].limit = parseInt(value);
    console.log(teacherTmp);
    setTeacher(teacherTmp);

    const sumLimit = teacherTmp.reduce((prev, curr) => prev + curr.limit, 0);
    const sumLimitBoard = teacherTmp.reduce(
      (prev, curr) => prev + curr.limitBoard,
      0
    );

    if (sumLimit >= group.length && sumLimitBoard >= group.length * 2) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  };
  const changeLimitBoardHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    let teacherTmp = [...teacher];
    const indexTeacher = teacherTmp.findIndex(
      (item) => item.firstname === name
    );
    teacherTmp[indexTeacher].limitBoard = parseInt(value);
    console.log(teacherTmp);
    setTeacher(teacherTmp);

    const sumLimit = teacherTmp.reduce((prev, curr) => prev + curr.limit, 0);

    const sumLimitBoard = teacherTmp.reduce(
      (prev, curr) => prev + curr.limitBoard,
      0
    );

    if (sumLimit >= group.length && sumLimitBoard >= group.length * 2) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  };
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  const clickSubmitHandler = () => {
    let advisorGroup = [];
    let boardGroup = [];
    let teachers = [...teacher];
    let groups = [...group];

    for (let i = 0; i < teachers.length; i++) {
      let advicerRound = 1;
      let boardRound = 1;

      while (advicerRound <= teachers[i].limit) {
        advisorGroup.push({ ...teachers[i] });
        advicerRound++;
      }
      while (boardRound <= teachers[i].limitBoard) {
        boardGroup.push({ ...teachers[i], uuid: v4() });
        boardRound++;
      }
    }

    // shuffle tchGroup
    for (let i = advisorGroup.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = advisorGroup[i];
      advisorGroup[i] = advisorGroup[j];
      advisorGroup[j] = temp;
    }

    // shuffle boardGroup
    for (let i = boardGroup.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = boardGroup[i];
      boardGroup[i] = boardGroup[j];
      boardGroup[j] = temp;
    }
    const updatedGroups = groups.map((item, idx) => {
          let boardTmp = [...boardGroup];
          let teachersNoAdvisor = boardTmp.filter(
            (teacherItem) => teacherItem.id !== advisorGroup[idx].id
          );
          let randIndexBoard1 = Math.floor(
            Math.random() * teachersNoAdvisor.length
          );
    
          let teachersNoAdvisorAndBoard1 = teachersNoAdvisor.filter(
            (teacherItem) =>
              teacherItem.id !== teachersNoAdvisor[randIndexBoard1].id
          );
          let randIndexBoard2 = Math.floor(
            Math.random() * teachersNoAdvisorAndBoard1.length
          );
          console.log("advisor:", advisorGroup[idx]);
          console.log("no advisor :", teachersNoAdvisor);
          console.log("no advisor && board1 :", teachersNoAdvisorAndBoard1);
    
          item.boards = {
            advisor: { ...advisorGroup[idx], role: "advisor" },
            board1: { ...teachersNoAdvisor[randIndexBoard1], role: "board1" },
            board2: {
              ...teachersNoAdvisorAndBoard1[randIndexBoard2],
              role: "board2",
            },
          };
    
          return item;
        });

    // const updatedGroups = groups.map(async(item, idx) => {
    //   console.log(boardTmp);
    //   console.log(idx);
    //   const board1List = boardTmp.filter((item=> item.id !== tchGroup[idx].id))
    //   const board2List = board1List.filter((item=> item.uuid !== board1List[idx].uuid))
    //   console.log(board1List,board2List);

    //   const  advisor = tchGroup[idx];
    //   const  board1 = board1List[idx]
    //   const board2 = board2List[idx]
    //   console.log(advisor,board1,board2);

    //   boardTmp =  boardTmp.filter(boardItem => boardItem.uuid !== board1.uuid && boardItem.uuid !== board2.uuid);
    //   console.log(boardTmp);
    //   item.boards = {
    //     advisor: { ...advisor, role: "advisor" },
    //     board1: { ...board1, role: "board1" },
    //     board2: {
    //       ...board2,
    //       role: "board2",
    //     },
    //   };

    //   return item;
    // });

    // console.log(updatedGroups);
    console.log(groups);
    // console.log(boardTmp);
    setGroup(groups);
    setIsRamdom(true);
  };

  // algo backup
  // const clickSubmitHandler = () => {
  //   let tchGroup = [];
  //   let teachers = [...teacher];
  //   let groups = [...group];
  //   // add tch to arr by limit
  //   for (let i = 0; i < teachers.length; i++) {
  //     let round = 1;

  //     while (round <= teachers[i].limit) {
  //       tchGroup.push({ ...teachers[i] });
  //       round++;
  //     }
  //   }
  //   console.log(tchGroup);

  //   // shuffle tchGroup
  //   for (let i = tchGroup.length - 1; i > 0; i--) {
  //     let j = Math.floor(Math.random() * (i + 1));
  //     let temp = tchGroup[i];
  //     tchGroup[i] = tchGroup[j];
  //     tchGroup[j] = temp;
  //   }

  //   console.log(tchGroup);

  //   // for(let i = 0 ; i <groups.length;i++){
  //   //   groups[i].advisor = tchGroup[i]
  //   // }

  //   for (let i = teachers.length - 1; i > 0; i--) {
  //     let j = Math.floor(Math.random() * (i + 1));
  //     let temp = teachers[i];
  //     teachers[i] = teachers[j];
  //     teachers[j] = temp;
  //   }

  //   // groups.map((item, idx) => {
  //   //   let teachersNoAdvisor = teachers.filter(
  //   //     (item) => item.id !== tchGroup[idx].id
  //   //   );
  //   //   let teachersNoAdvisorAndBoard1 = teacher.filter(
  //   //     (item) =>
  //   //       item.id !== tchGroup[idx].id && item.id !== teachersNoAdvisor[idx].id
  //   //   );

  //   //   item.boards.advisor = tchGroup[idx];
  //   //   item.boards.board1 = teachersNoAdvisor[idx];
  //   //   item.boards.board2 = teachersNoAdvisorAndBoard1[idx];
  //   // });
  //   const updatedGroups = groups.map((item, idx) => {
  //     let teachers = [...teacher];
  //     let teachersNoAdvisor = teachers.filter(
  //       (teacherItem) => teacherItem.id !== tchGroup[idx].id
  //     );
  //     let randIndexBoard1 = Math.floor(
  //       Math.random() * teachersNoAdvisor.length
  //     );

  //     let teachersNoAdvisorAndBoard1 = teachersNoAdvisor.filter(
  //       (teacherItem) =>
  //         // teacherItem.id !== tchGroup[idx].id &&
  //         teacherItem.id !== teachersNoAdvisor[randIndexBoard1].id
  //     );
  //     let randIndexBoard2 = Math.floor(
  //       Math.random() * teachersNoAdvisorAndBoard1.length
  //     );

  //     console.log("advisor:", tchGroup[idx]);
  //     console.log("no advisor :", teachersNoAdvisor);
  //     console.log("no advisor && board1 :", teachersNoAdvisorAndBoard1);

  //     item.boards = {
  //       advisor: { ...tchGroup[idx], role: "advisor" },
  //       board1: { ...teachersNoAdvisor[randIndexBoard1], role: "board1" },
  //       board2: {
  //         ...teachersNoAdvisorAndBoard1[randIndexBoard2],
  //         role: "board2",
  //       },
  //     };

  //     return item;
  //   });

  //   // console.log(updatedGroups);
  //   console.log(groups);
  //   setGroup(groups);
  //   setIsRamdom(true);

  //   // let groups = [...group];
  //   // // console.log(teachers);
  //   // // console.log(groups);
  //   // console.log(teachers);
  //   // for (let i = teachers.length - 1; i > 0; i--) {
  //   //   const j = Math.floor(Math.random() * (i + 1));
  //   //   [teachers[i], teachers[j]] = [teachers[j], teachers[i]];
  //   // }
  //   // console.log(teachers);

  //   // let teacherIndex = 0;
  //   // for (let i = 0; i < groups.length; i++) {
  //   //   const groupss = groups[i];

  //   //   const assignTeacher = (teacher) => {
  //   //     // console.log(teacher);
  //   //     if(teacher.limit === ""){
  //   //       return ""
  //   //     }
  //   //     if (teacher.limit > 0) {
  //   //       teacher.limit--;
  //   //       return teacher.firstname;
  //   //     }
  //   //     return "";
  //   //   };

  //   //   // console.log(teachers[teacherIndex]);
  //   //   groupss.advisor = assignTeacher(teachers[teacherIndex]) || "";
  //   //   groupss.bord1 = assignTeacher(teachers[teacherIndex + 1]) || "";
  //   //   groupss.bord2 = assignTeacher(teachers[teacherIndex + 2]) || "";

  //   //   teacherIndex += 3;
  //   // }

  //   // console.log(groups);
  // };

  return (
    <div className="my-1">
      <div className="grid grid-cols-3 gap-y-1">
        <div>รายชื่ออาจารย์</div>
        <div>โควต้าที่ปรึกษา</div>
        <div>โควต้ากรรมการสอบ</div>

        {teacher.map((item, idx) => {
          return (
            <Fragment key={idx}>
              <div>{item.firstname}</div>
              <div>
                <select
                  name={item.firstname}
                  id=""
                  className="w-14"
                  onChange={(e) => changeLimitHandler(e)}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div>
                <select
                  name={item.firstname}
                  id=""
                  className="w-14"
                  onChange={(e) => changeLimitBoardHandler(e)}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
            </Fragment>
          );
        })}
      </div>

      <button
        className="px-4 py-1 bg-green-300 rounded-md my-2 hover:bg-green-500 disabled:opacity-50 disabled:bg-green-100"
        disabled={isDisable}
        onClick={() => clickSubmitHandler()}
      >
        สุ่ม
      </button>

      {isDisable && (
        <div className="text-center font-bold text-red-500 ">
          ** ต้องการที่ปรึกษา {group.length} คน **
        </div>
      )}
    </div>
  );
};

export default FormRandom;
