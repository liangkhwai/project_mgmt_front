import React from "react";
import { useEffect } from "react";
import { Fragment } from "react";

const FormRandomList = ({ groupList, teacherList, setGroupList }) => {
  console.log(groupList);

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
  const changeBoardGroup = (group, board, teacher) => {
    teacher = JSON.parse(teacher);
    setGroupList(
      groupList.map((obj) => {
        if (obj.id === group.id) {
          return {
            ...obj,
            boards: {
              ...obj.boards,
              [board]: {
                ...obj.boards[board],
                id: teacher.id,
                firstname: teacher.firstname,
                lastname: teacher.lastname,
              },
            },
          };
        } else {
          return obj;
        }
      }),
    );
  };
  useEffect(() => {
    console.log(groupList);
  }, [groupList]);

  const saveBoards = async (group) => {
    console.log(group);
  };

  return (
    <div className="">
      <table className="table w-full ">
        <thead>
          <tr>
            <th>ชื่อหัวข้อ</th>
            <th>อาจารย์ที่ปรึกษา</th>
            <th>ประธานกรรมการสอบ</th>
            <th>กรรมการสอบ</th>
            <th>บันทึก</th>
          </tr>
        </thead>
        <tbody>
          {groupList.map((item, idx) => (
            <Fragment key={idx}>
              <tr>
                <td className="w-20 break-all sm:w-32 md:w-48 lg:w-60 xl:w-[50%] xl:break-all xl:pr-10">
                  {item.title ? item.title : "ไม่มีชื่อหัวข้อ"}
                </td>

                <td>
                  <select
                    onChange={(e) =>
                      changeBoardGroup(item, "advisor", e.target.value)
                    }
                    defaultValue={JSON.stringify(defaultAdvsior)}
                  >
                    {teacherList.map((teacher) => (
                      <option
                        value={JSON.stringify(teacher)}
                        defaultValue={true}
                      >
                        {teacher.firstname} {teacher.lastname}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <select
                    onChange={(e) =>
                      changeBoardGroup(item, "board1", e.target.value)
                    }
                    defaultValue={JSON.stringify(defaultBoard1)}
                  >
                    {teacherList.map((teacher) => (
                      <option
                        value={JSON.stringify(teacher)}
                        defaultValue={true}
                      >
                        {teacher.firstname} {teacher.lastname}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <select
                    onChange={(e) =>
                      changeBoardGroup(item, "board2", e.target.value)
                    }
                    defaultValue={JSON.stringify(defaultBoard2)}
                  >
                    {teacherList.map((teacher) => (
                      <option
                        value={JSON.stringify(teacher)}
                        defaultValue={true}
                      >
                        {teacher.firstname} {teacher.lastname}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <button
                    className="rounded-xl bg-green-400 px-4 py-2 text-center text-white"
                    onClick={() => saveBoards(item)}
                  >
                    บันทึก
                  </button>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormRandomList;
