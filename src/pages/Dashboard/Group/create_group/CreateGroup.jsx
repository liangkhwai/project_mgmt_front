import React, { useEffect, useState } from "react";
import Title from "../../../../UI/Title.jsx";
import Body from "../../../../UI/Body.jsx";
import TableForm from "./components/TableForm.jsx";
import TableList from "./components/TableList.jsx";
import InputForm from "./components/InputForm.jsx";
import { AddButton } from "../../../../UI/button.jsx";

const CreateGroup = () => {
  const [loadedResearcherList, setLoadedResearcherList] = useState([]);

  const [rshList, setRshList] = useState([
    {
      student_id: "1",
      firstname: "2",
      lastname: "3",
      tel: "4",
      email: "5",
      grade: "6",
    },
  ]);
  useEffect(() => {
    async function fetchRshList() {
      const res = await fetch("http://localhost:8080/researcher/list", {
        method: "get",
        credentials: "include",
      });
      const data = await res.json();
      // console.log(typeof data);
      setLoadedResearcherList(data);
    }
    fetchRshList();
  }, []);

  return (
    <div className="mx-10">
      <Title>สร้างกลุ่มโปรเจค</Title>

      <Body>
        {/* <TableForm /> */}
        <div className="my-1">
          รายละเอียดผู้วิจัย <span className="text-red-600">*</span>
        </div>
        <TableList rshList={rshList} setRshList={setRshList} />
        <div className="pb-10"></div>
        {rshList.length < 3 && <InputForm setRshList={setRshList} loadedResearcherList={loadedResearcherList} />}
        <div className="text-end pt-5">
          <AddButton> สร้างกลุ่ม และ เชิญผู้วิจัย</AddButton>
        </div>
      </Body>
    </div>
  );
};

export default CreateGroup;
