import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLoaderData, useParams } from "react-router-dom";
import GroupMemberList from "./GroupMemberList";

const GroupDetail = () => {
  const getGroupDetail = useLoaderData();
  const [grpDetail, setGrpDetail] = useState(getGroupDetail);
  const [grpMember, setGrpMember] = useState([]);
  let { grpId } = useParams();

  

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
