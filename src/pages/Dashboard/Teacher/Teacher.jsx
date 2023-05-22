import React, { useEffect, useState } from "react";
import TeacherTable from "./components/TeacherTable";
import Title from "../../../UI/Title";
import Body from "../../../UI/Body";

const Teacher = () => {
  const [teacherLists, setTeacherLists] = useState([]);

  useEffect(() => {
    async function fetchTeacherlist() {
      const res = await fetch("http://localhost:8080/teachers/list", {
        method: "get",
        credentials: "include",
      });
      const data = await res.json();
      setTeacherLists(data);
    }
    fetchTeacherlist();
  }, []);

  //   console.log(teacherLists);
  return (
    <div className="mx-10">
      {/* <h1 className="text-3xl my-10">อาจารย์</h1> */}
      <Title>อาจารย์</Title>

      <Body>
        <TeacherTable data={teacherLists} setData={setTeacherLists} />
      </Body>
    </div>
  );
};

export default Teacher;
