import React, { useState } from "react";
import Title from "../../../../../../UI/Title";
import Body from "../../../../../../UI/Body";

const GroupMemberList = ({ grpId, grpDetail, grpMember }) => {

    const [groupDetail,setGroupDetail] = useState(grpDetail)


    // console.log(grpDetail.title);
  return (
    <div>
      <Body>
        <Title>{groupDetail &&groupDetail.title}</Title>
      </Body>
    </div>
  )
};

export default GroupMemberList;
