import React, { Fragment, useEffect, useState } from "react";
import GroupList from "./GroupList";

const GroupBox = ({ userGroup }) => {
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    async function getGroupList() {
      const res = await fetch("http://localhost:8080/researcher/getGroupList", {
        method: "get",
        credentials: "include",
      });
      const data = await res.json();
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
