import React, { useEffect, useState } from "react";
import Title from "../../../../UI/Title.jsx";
import Body from "../../../../UI/Body.jsx";
import TableForm from "./components/TableForm.jsx";
import TableList from "./components/TableList.jsx";
import InputForm from "./components/InputForm.jsx";

const CreateGroup = () => {
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
    console.log(rshList);
  }, [rshList]);

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
        {rshList.length < 3 && <InputForm setRshList={setRshList} />}
      </Body>
    </div>
  );
};

export default CreateGroup;
