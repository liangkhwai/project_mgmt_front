import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLoaderData, useParams } from "react-router-dom";
import GroupMemberList from "./GroupMemberList";

const GroupDetail = () => {
  const getGroupDetail = useLoaderData();
  const [grpDetail, setGrpDetail] = useState(getGroupDetail);
  const [grpMember, setGrpMember] = useState([]);
  let { grpId } = useParams();
 

  const GroupMember = useQuery("getGroupMember", async () => {
    let userId = localStorage.getItem("id");
    const response = await fetch(
      "http://localhost:8080/researcher/getGroupList",
      {
        method: "post",
        body: JSON.stringify({ userId: parseInt(userId) }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    return data;
  });

  useEffect(
    () => {
    
      if (GroupMember.data) {
        setGrpMember([...GroupMember.data.groupList]);
      }
      console.log(GroupMember.data);
      
    },

    [GroupMember.data]
  );

  if (GroupMember.isLoading) return "...Loading member";

  return (
    <div>
      <GroupMemberList
        grpDetail={grpDetail}
        grpMember={grpMember}
        grpId={grpId}
      />
    </div>
  );
};

export default GroupDetail;
