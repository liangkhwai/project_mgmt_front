import React, { Fragment, useEffect, useState } from "react";
import GroupList from "./GroupList";

const GroupBox = ({ userGroup }) => {
  const [groupList, setGroupList] = useState([]);
  useEffect(() => {
    let userId = localStorage.getItem("id")
    async function getGroupList() {
      const res = await fetch("http://localhost:8080/researcher/getGroupList", {
        method: "post",
        body:JSON.stringify({userId:userId}),
        credentials: "include",
        headers:{"Content-Type":"application/json"}
      });
      const data = await res.json();
      setGroupList(data.groupList);
    }
    getGroupList();
  }, []);
  
  return (
    <Fragment>
      <GroupList groupList={groupList} />
    </Fragment>
  );
};

export default GroupBox;
