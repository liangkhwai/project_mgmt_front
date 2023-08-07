import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Title from "../../../../UI/Title";
import Body from "../../../../UI/Body";
import GroupBox from "./components/GroupBox";
import { useQuery } from "react-query";

const Group = () => {
  const selfInfo = useLoaderData();
  console.log(selfInfo);
  return (
    <div className="mx-10">
      <Title>กลุ่มโปรเจค</Title>
      <Body>
        {selfInfo?.groupId === null ? (
          <Link to="/dashboard/group/create">
            <div className="border-black border-2 rounded-md py-20 text-center hover:bg-gray-100">
              +<br />
              สร้างกลุ่ม
            </div>
          </Link>
        ) : (
          <GroupBox selfInfo={selfInfo}/>
        )}
      </Body>
    </div>
  );
};

export default Group;
