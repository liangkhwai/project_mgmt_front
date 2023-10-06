import React from "react";
import Title from "../../UI/Title";
import Body from "../../UI/Body";
import { useLoaderData } from "react-router-dom";
import PasswordForm from "./components/PasswordForm";
const Password = () => {
  const data = useLoaderData();
  const [ information, setInformation ] = React.useState(data)
  return (
    <div className="mx-10">
      <Title>เปลี่ยนรหัสผ่าน</Title>
      <Body>
        <PasswordForm
          information={information}
          setInformation={setInformation}
        />
      </Body>
    </div>
  );
};

export default Password;
