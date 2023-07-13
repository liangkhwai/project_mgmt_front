import React from "react";
import Body from "../../../../../UI/Body";
import Title from "../../../../../UI/Title";
import GroupListBox from "./components/GroupListBox";
const GroupList = () => {
  return (
    <div className="mx-10">
      <Title>กลุ่มนักศึกษา</Title>
      <Body>

  
        <input className="focus:bg-blue-50 border-gray-400 " type="text" placeholder="Search group name ✨" />       {/* make it component instead  */}


        <GroupListBox/>
        



      </Body>
    </div>
  );
};

export default GroupList;
