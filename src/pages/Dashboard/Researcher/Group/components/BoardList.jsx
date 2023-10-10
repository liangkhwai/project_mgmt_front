import React, { Fragment, useEffect, useState } from "react";
import { useQuery } from "react-query";

const BoardList = ({ boards }) => {
  const [boardsItem, setBoardsItem] = useState([boards]);
  console.log(boards);
  const findRole = (role) => {
    if (role === "advisor") {
      return "อาจารย์ที่ปรึกษา";
    } else if (role === "board1") {
      return "ประธานกรรมการสอบ";
    } else {
      return "กรรมการสอบ";
    }
  };

  return (
    <Fragment>
      {boards?.map((item, idx) => (
        <Fragment key={item.id}>
          <div className="flex justify-between p-5 border-b">
            <div>{findRole(item.role)}</div>
            <div>
              {item.firstname} {item.lastname}
            </div>
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default BoardList;
