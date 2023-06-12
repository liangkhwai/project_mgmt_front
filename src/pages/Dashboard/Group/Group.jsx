import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../../UI/Title";
import Body from "../../../UI/Body";
import GroupListBox from "./components/GroupListBox";

const Group = () => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    async function getUser() {
      const res = await fetch("http://localhost:8080/researcher/getOne", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data.userData);
      setUserData(data.userData);
    }
    getUser();
  }, []);

  return (
    <div className="mx-10">
      <Title>กลุ่มโปรเจค</Title>
      <Body>
        {userData?.groupId === null ? (
          <Link to="/dashboard/group/create">
            <div className="border-black border-2 rounded-md py-20 text-center hover:bg-gray-100">
              +<br />
              สร้างกลุ่ม
            </div>
          </Link>
        ) : (
          <GroupListBox />
        )}
      </Body>
    </div>
  );
};

export default Group;
