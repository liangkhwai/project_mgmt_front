import React, { useEffect, useState, useContext } from "react";
import Title from "../../../../UI/Title.jsx";
import Body from "../../../../UI/Body.jsx";
import TableForm from "./components/TableForm.jsx";
import TableList from "./components/TableList.jsx";
import InputForm from "./components/InputForm.jsx";
import { AddButton } from "../../../../UI/button.jsx";
import AuthContext from "../../../../context/auth.jsx";

const CreateGroup = () => {
  const [loadedResearcherList, setLoadedResearcherList] = useState([]);

  const [rshList, setRshList] = useState([]);
  useEffect(() => {
    async function getDefaultMember() {
      const res = await fetch("http://localhost:8080/researcher/getOne", {
        method: "get",
        credentials: "include",
      });
      const data = await res.json();
      setRshList((prev) => [{ ...prev, ...data.userData }]);
    }
    getDefaultMember();
  }, []);

  useEffect(() => {
    async function fetchRshList() {
      const res = await fetch("http://localhost:8080/researcher/list", {
        method: "get",
        credentials: "include",
      });
      const data = await res.json();

      setLoadedResearcherList(data);
    }
    fetchRshList();
  }, []);

  const createGroupSubmitHandler = async () => {
    console.log(rshList);

    const response = await fetch("http://localhost:8080/group/create", {
      method: "post",
      body: JSON.stringify({ group_list: rshList }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then(async (res) => {
      const data = await res.json();
      console.log(data);
    });
  };

  return (
    <div className="mx-10">
      <Title>สร้างกลุ่มโปรเจค</Title>

      <Body>
        {/* <TableForm /> */}
        <div className="my-1">
          รายละเอียดผู้วิจัย <span className="text-red-600">*</span>
        </div>
        <TableList
          rshList={rshList}
          setRshList={setRshList}
          setLoadedResearcherList={setLoadedResearcherList}
        />
        <div className="pb-10"></div>
        {rshList.length < 3 && (
          <InputForm
            setRshList={setRshList}
            setLoadedResearcherList={setLoadedResearcherList}
            loadedResearcherList={loadedResearcherList}
          />
        )}
        <div className="text-end pt-5">
          <AddButton onClick={() => createGroupSubmitHandler()}>
            {" "}
            สร้างกลุ่ม และ เชิญผู้วิจัย
          </AddButton>
        </div>
      </Body>
    </div>
  );
};

export default CreateGroup;
