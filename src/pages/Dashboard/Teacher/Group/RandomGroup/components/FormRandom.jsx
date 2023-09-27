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
    let teacherSetting = [...teacher];
    let groups = [...group];

    //shuffle teachers
    for (let i = teachers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = teachers[i];
      teachers[i] = teachers[j];
      teachers[j] = temp;
    }

    //shuffle teachersSetting
    for (let i = teacherSetting.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = teacherSetting[i];
      teacherSetting[i] = teacherSetting[j];
      teacherSetting[j] = temp;
    }
    // shuffle groups
    for (let i = groups.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = groups[i];
      groups[i] = groups[j];
      groups[j] = temp;
    }

    // Global parameter
    const result = [];
    const resultRound = [];
    const advisorList = teachers;

    const projectList = groups;

    const setting = teacherSetting;
    console.log(advisorList, projectList, setting);
    function searchResultRound(groupSearch, advisorSearch) {
      try {
        if (resultRound[0].id === groupSearch) {
          if (resultRound[1].id === advisorSearch) {
            return true;
          } else if (resultRound[2].id === advisorSearch) {
            return true;
          } else if (resultRound[3].id === advisorSearch) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    }

    function searchSetting(advisorCommitSearch, position) {
      for (const settingItem of setting) {
        if (settingItem.id === advisorCommitSearch) {
          if (settingItem.limit > 0 && position === 1) {
            return true;
          } else if (settingItem.limitBoard > 0 && position === 2) {
            return true;
          } else {
            return false;
          }
        }
      }
      return false;
    }

    function updateSettingAdviser(keyUpdate) {
      for (const item of setting) {
        if (item.id === keyUpdate) {
          item.limit = parseInt(item.limit) - 1;
          // console.log("adviser " + keyUpdate);
          break;
        }
      }
    }

    function updateSettingCommittee(keyUpdate) {
      for (const item of setting) {
        if (item.id === keyUpdate) {
          // console.log("committee " + keyUpdate);
          item.limitBoard = parseInt(item.limitBoard) - 1;
          break;
        }
      }
    }

    for (const projItem of projectList) {
      resultRound.push(projItem);
      for (const advisorItem of advisorList) {
        const sResult = searchResultRound(projItem.id, advisorItem.id);
        if (!sResult) {
          if (searchSetting(advisorItem.id, 1)) {
            resultRound.push(advisorItem);
            updateSettingAdviser(advisorItem.id);
            break;
          }
        }
      }

      for (const advisorItem of advisorList) {
        const sResult = searchResultRound(projItem.id, advisorItem.id);
        if (!sResult) {
          if (searchSetting(advisorItem.id, 2)) {
            resultRound.push(advisorItem);
            updateSettingCommittee(advisorItem.id);
            break;
          }
        }
      }

      for (const advisorItem of advisorList) {
        const sResult = searchResultRound(projItem.id, advisorItem.id);
        if (!sResult) {
          if (searchSetting(advisorItem.id, 2)) {
            resultRound.push(advisorItem);
            updateSettingCommittee(advisorItem.id);
            console.log(resultRound);
            console.log(setting);
            result.push([...resultRound]);
            resultRound.length = 0;
            break;
          }
        }
      }
    }
    console.log(result);
    setGroup(
      result.map((item) => {
        return {
          ...item[0],
          boards: {
            advisor: item[1],
            board1: item[2],
            board2: item[3],
          },
        };
      })
    );
    setIsRamdom(true);
    // function searchResultRound(groupSearch, advisorSearch) {
    //   try {
    //     if (resultRound[0] === groupSearch) {
    //       if (resultRound[1] === advisorSearch) {
    //         return true;
    //       } else if (resultRound[2] === advisorSearch) {
    //         return true;
    //       } else if (resultRound[3] === advisorSearch) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     } else {
    //       return false;
    //     }
    //   } catch (error) {
    //     return false;
    //   }
    // }

    // function searchSetting(advisorCommitSearch, position) {
    //   for (const settingItem of setting) {
    //     if (settingItem.firstname === advisorCommitSearch) {
    //       if (settingItem.limit > 0 && position === 1) {
    //         return true;
    //       } else if (settingItem.limitBoard > 0 && position === 2) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     }
    //   }
    //   return false;
    // }

    // function updateSettingAdviser(keyUpdate) {
    //   for (const item of setting) {
    //     if (item.firstname === keyUpdate) {
    //       item.limit = parseInt(item.limit) - 1;
    //       console.log("adviser " + keyUpdate);
    //       break;
    //     }
    //   }
    // }

    // function updateSettingCommittee(keyUpdate) {
    //   for (const item of setting) {
    //     if (item.firstname === keyUpdate) {
    //       console.log("committee " + keyUpdate);
    //       item.limitBoard = parseInt(item.limitBoard) - 1;
    //       break;
    //     }
    //   }
    // }

    // for (const projItem of projectList) {
    //   resultRound.push(projItem.id);
    //   for (const advisorItem of advisorList) {
    //     const sResult = searchResultRound(projItem.id, advisorItem.firstname);
    //     if (!sResult) {
    //       if (searchSetting(advisorItem.firstname, 1)) {
    //         console.table(advisorItem);
    //         resultRound.push(advisorItem.firstname);
    //         updateSettingAdviser(advisorItem.firstname);
    //         break;
    //       }
    //     }
    //   }

    //   for (const advisorItem of advisorList) {
    //     const sResult = searchResultRound(projItem.id, advisorItem.firstname);
    //     if (!sResult) {
    //       if (searchSetting(advisorItem.firstname, 2)) {
    //         console.table(advisorItem);

    //         resultRound.push(advisorItem.firstname);
    //         updateSettingCommittee(advisorItem.firstname);
    //         break;
    //       }
    //     }
    //   }

    //   for (const advisorItem of advisorList) {
    //     const sResult = searchResultRound(projItem.id, advisorItem.firstname);
    //     if (!sResult) {
    //       if (searchSetting(advisorItem.firstname, 2)) {
    //         console.table(advisorItem);

    //         resultRound.push(advisorItem.firstname);
    //         updateSettingCommittee(advisorItem.firstname);
    //         console.log(resultRound);
    //         console.log(setting);
    //         result.push([...resultRound]);
    //         resultRound.length = 0;
    //         break;
    //       }
    //     }
    //   }
    // }

    // console.log(result);
  };

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
