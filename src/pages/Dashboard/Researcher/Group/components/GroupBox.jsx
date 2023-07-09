import React, { Fragment, useEffect, useState } from "react";
import GroupList from "./GroupList";
import { useNavigate } from "react-router-dom";

const GroupBox = ({ userGroup }) => {
  const navigate = useNavigate()
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
      if(res.status === 401) return navigate("/dashboard")
      console.log(data);
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
