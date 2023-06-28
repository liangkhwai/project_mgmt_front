import React, { useState, useEffect, Fragment, useRef } from "react";
import { FiCheck, FiX } from "react-icons/fi/";
import { BsPencilSquare } from "react-icons/bs";
import { useMutation, useQuery } from "react-query";
import TitleGroup from "./TitleGroup";
const GroupList = ({ groupList }) => {
  const [isInsert, setIsInsert] = useState(false);
  const [group, setGroup] = useState();
  const [title, setTitle] = useState("");
  const inputRef = useRef();
  // useEffect(() => {
  //   async function getGroup() {
  //     const res = await fetch("http://localhost:8080/group/getGroup", {
  //       method: "get",
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     // console.log(data);
  //     setGroup(data);
  //   }
  //   getGroup();
  // }, []);

  const { isLoading, err, data, status } = useQuery(
    "getGroupData",
    async () => {
      const res = await fetch("http://localhost:8080/group/getGroup", {
        method: "get",
        credentials: "include",
      });
      const data = await res.json();
      return data;
    }
  );

  useEffect(() => {
    if (data) {
      setGroup(data);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (newTitle) => {
      return await fetch("http://localhost:8080/group/createTitleGroup", {
        method: "POST",
        body: JSON.stringify({ title: newTitle }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      setTitle(inputRef.current.value);
      setIsInsert(!isInsert);
    },
  });

  const updateTitleSubmitHandler = async () => {
    mutation.mutate(inputRef.current.value);
  };

  return (
    <div className="w-full border border-black p-5 rounded-md ">
      {/* {group?.title === null ? (
        <div className="flex items-center mb-3">
          <div className="w-40 text-center ">ชื่อหัวข้อ</div>
          {!isInsert ? (
            <Fragment>
              <div className="w-full mr-3">
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full rounded-md border-black"
                  placeholder="ใส่ชื่อหัวข้อ"
                  // value={title}
                />
              </div>
              <button
                className="px-3 py-2 hover:bg-green-200 rounded-sm transition"
                onClick={() => updateTitleSubmitHandler()}
              >
                <FiCheck color="green" size="25px" />
              </button>
              {title.length > 0 && (
                <button
                  className="px-3 py-2 hover:bg-green-200 rounded-sm transition"
                  onClick={() => setIsInsert(!isInsert)}
                >
                  <FiX color="red" size="25px" />
                </button>
              )}
            </Fragment>
          ) : (
            <Fragment>
              <div>{group.title}</div>
              <button
                className="px-3 py-2"
                onClick={() => setIsInsert(!isInsert)}
              >
                <BsPencilSquare color="" size="20px" />
              </button>
            </Fragment>
          )}
        </div>
      ) : (
        // <button
        //   className="w-full text-center rounded-md border border-black p-5 mb-3 hover:bg-gray-100 hover:text-gray-800 "
        //   onClick={() => setIsInsert(!isInsert)}
        // >
        //   ใส่ชื่อหัวข้อ
        // </button>
        <Fragment>
          <div>{group?.title}</div>
          <button className="px-3 py-2" onClick={() => setIsInsert(!isInsert)}>
            <BsPencilSquare color="" size="20px" />
          </button>
        </Fragment>
      )} */}
      <TitleGroup/>
      <div className="rounded-md border border-black">
        <table className="table-auto w-full text-center  ">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>รหัสนักศึกษา</th>
              <th>ชื่อ - นามสกุล</th>
              <th>เบอร์โทร</th>
              <th>Email</th>
              <th>เกรดเฉลี่ย</th>
            </tr>
          </thead>
          <tbody>
            {groupList.map((item, idx) => {
              return (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>{item.student_id}</td>
                  <td>
                    {item.firstname} {item.lastname}
                  </td>
                  <td>{item.tel}</td>
                  <td>{item.email}</td>
                  <td>{item.grade}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupList;
