import React from "react";
import Title from "../../../../UI/Title.jsx";
import Body from "../../../../UI/Body.jsx";
import TableForm from "./components/TableForm.jsx";

const CreateGroup = () => {
  return (
    <div className="mx-10">
      <Title>สร้างกลุ่มโปรเจค</Title>

      <Body>
        <TableForm/>
      </Body>
    </div>
  );
};

export default CreateGroup;
