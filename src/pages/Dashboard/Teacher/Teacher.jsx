import React, { useEffect, useState } from "react";
import TeacherTable from "./components/TeacherTable";
import Title from "../../../UI/Title";
import Body from "../../../UI/Body";

const Teacher = () => {
  const [teacherLists, setTeacherLists] = useState([]);

  useEffect(() => {
    async function fetchTeacherlist() {
      const res = await fetch("http://127.0.0.1:8080/teachers/list", {
        method: "get",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setTeacherLists(data);
    }
    fetchTeacherlist();
  }, []);

  //   console.log(teacherLists);
  return (
    <div className="mx-10">
      {/* <h1 className="text-3xl my-10">อาจารย์</h1> */}
      <Title>รายชื่ออาจารย์</Title>

      <Body>
        <TeacherTable data={teacherLists} setData={setTeacherLists} />
      </Body>
    </div>
  );
};

export default Teacher;
