import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../../UI/Title";
import Body from "../../../UI/Body";
import GroupBox from "./components/GroupBox";
import { useQuery } from "react-query";

const Group = () => {
  const [userData, setUserData] = useState();
  // useEffect(() => {
  //   async function getUser() {
  //     const res = await fetch("http://localhost:8080/researcher/getOne", {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     setUserData(data.userData);
  //   }
  //   getUser();
  // }, []);

  const { isLoading, error, data, status } = useQuery(
    "getOneUser",
    async () => {
      const response = await fetch("http://localhost:8080/researcher/getOne", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      return data;
    }
  );
  useEffect(() => {
    if (data) {
      console.log(data);
      setUserData(data);
    }
  }, [data]);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error;
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
          <GroupBox />
        )}
      </Body>
    </div>
  );
};

export default Group;
