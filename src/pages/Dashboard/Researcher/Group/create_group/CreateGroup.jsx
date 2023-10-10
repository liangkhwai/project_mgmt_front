import React, { useEffect, useState, useContext } from "react";
import Title from "../../../../../UI/Title.jsx";
import Body from "../../../../../UI/Body.jsx";
import TableForm from "./components/TableForm.jsx";
import TableList from "./components/TableList.jsx";
import InputForm from "./components/InputForm.jsx";
import { AddButton } from "../../../../../UI/button.jsx";
import AuthContext from "../../../../../context/auth.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateGroup = () => {
  const [loadedResearcherList, setLoadedResearcherList] = useState([]);
  const navigate = useNavigate();
  const [rshList, setRshList] = useState([]);
  useEffect(() => {
    async function fetchRshList() {
      const res = await fetch("http://localhost:8080/researcher/list", {
        method: "get",
        credentials: "include",
      });
      const data = await res.json();

      setLoadedResearcherList(
        data.filter((item, idx) => item.groupId === null),
      );
    }
    fetchRshList();
  }, []);
  useEffect(() => {
    async function getDefaultMember() {
      const res = await fetch("http://localhost:8080/researcher/getOne", {
        method: "get",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      console.log(data.groupId);
      setRshList((prev) => [{ ...prev, ...data }]);
      setLoadedResearcherList((prev) =>
        prev.filter((item, idx) => item.id !== data.id),
      );
    }
    getDefaultMember();
  }, []);

  const createGroupSubmitHandler = async () => {
    console.log(rshList);
    Swal.fire({
      title: "ยืนยันการสร้างกลุ่มโปรเจค",
      text: "กดยืนยันเพื่อสร้างกลุ่มโปรเจค",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch("http://localhost:8080/group/create", {
          method: "post",
          body: JSON.stringify({ group_list: rshList }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }).then(async (res) => {
          const data = await res.json();
          console.log(data);
          if (res.status === 200) {
            localStorage.setItem("grpId", data);
            navigate("/dashboard/group");
          } else {
            Swal.fire({
              title: "เกิดข้อผิดพลาด",
              text: "กรุณาลองใหม่อีกครั้ง",
              icon: "error",
              confirmButtonText: "ตกลง",
            });
          }
        });
      }
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
        {rshList?.length < 3 && (
          <InputForm
            setRshList={setRshList}
            setLoadedResearcherList={setLoadedResearcherList}
            loadedResearcherList={loadedResearcherList}
          />
        )}
        <div className="pt-5 text-center">
          <AddButton onClick={() => createGroupSubmitHandler()}>
            {" "}
            สร้างกลุ่ม
          </AddButton>
        </div>
      </Body>
    </div>
  );
};

export default CreateGroup;
