import React from "react";
import { Fragment } from "react";

const ResultRandom = ({ group, setGroup }) => {
  console.log(group);
  return (
    <div className="">
      {group.map((item, idx) => {
        return (
          <Fragment key={idx}>
            <div className="border py-2 bg-gray-200 text-left my-2">
              {idx+1} {item.title}
              <div className="grid grid-cols-3">
                <div className="text-center">
                  ที่ปรึกษา <br />
                  {item.boards.advisor.firstname === null ? "ไม่มี" : item.boards.advisor.firstname}
                </div>
                <div className="text-center">
                  กรรมการสอบ <br />
                {item.boards.board1.firstname === null ? "ไม่มี" : item.boards.board1.firstname}
                </div>
                <div className="text-center">
                  กรรมการสอบ <br />
                {item.boards.board2.firstname === null ? "ไม่มี" : item.boards.board2.firstname}
                </div>
              </div>
            </div>
          </Fragment>
          // <Fragment key={idx}>
          //   <div className="border py-2 bg-gray-200 ">
          //     {idx+1} {item.title}
          //     <div className="grid grid-cols-3">
          //       <div className="text-center">
          //         ที่ปรึกษา <br />
          //         {item.advisor === "" ? "ไม่มี" : item.advisor}
          //       </div>
          //       <div className="text-center">
          //         กรรมการสอบ <br />
          //         {item.bord1 === "" ? "ไม่มี" : item.bord1}
          //       </div>
          //       <div className="text-center">
          //         กรรมการสอบ <br />
          //         {item.bord2 === "" ? "ไม่มี" : item.bord2}
          //       </div>
          //     </div>
          //   </div>
          // </Fragment>
        );
      })}
    </div>
  );
};

export default ResultRandom;
