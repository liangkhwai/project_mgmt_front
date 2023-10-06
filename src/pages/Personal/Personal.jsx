import React from "react";
import Title from "../../UI/Title";
import Body from "../../UI/Body";
import { useEffect } from "react";
import AuthContext from "../../context/auth";
import { useLoaderData } from "react-router-dom";
import TeacherInfo from "./components/TeacherInfo";
import ResearcherInfo from "./components/ResearcherInfo";
const Personal = () => {
  const role = useLoaderData();
  const [information, setinformation] = React.useState(role);
  const ctx = React.useContext(AuthContext);

  useEffect(() => {}, []);

  console.log(role);
  console.log(information);

  return (
    <div className="mx-10">
      <Title>ข้อมูลส่วนตัว</Title>

      <Body>
        {information.role === "teacher" && (
          <>
            <TeacherInfo
              information={information}
              setinformation={setinformation}
            />
          </>
        )}
        {information.role === "researcher" && (
          <>
            <ResearcherInfo
              information={information}
              setinformation={setinformation}
            />
          </>
        )}
      </Body>
    </div>
  );
};

export default Personal;
