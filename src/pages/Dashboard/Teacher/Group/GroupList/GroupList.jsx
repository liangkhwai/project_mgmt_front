import React from "react";
import Body from "../../../../../UI/Body";
import Title from "../../../../../UI/Title";
import GroupListBox from "./components/GroupListBox";
const GroupList = () => {
  return (
    <div className="mx-10">
      <Title>กลุ่มนักศึกษา</Title>
      {/* <Body> */}

  
        <input type="text" placeholder="Search group name" />       {/* make it component instead  */}


        <GroupListBox/>



      {/* </Body> */}
    </div>
  );
};

export default GroupList;
