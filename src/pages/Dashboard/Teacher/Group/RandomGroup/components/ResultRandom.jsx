import React from "react";
import { Fragment } from "react";
import { AddButton } from "../../../../../../UI/button";
import { useMutation } from "react-query";
import { v4 } from "uuid";
const ResultRandom = ({ group, setGroup, isRandom }) => {
  // console.log(group);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://localhost:8080/boards/add/random", {
        method: "POST",
        body: JSON.stringify({ grpData: group }),
        headers: { "Content-Type": "application/json" },
      });

      return response.json();
    },
    onSuccess: (data) => {
      setGroup([]);
      console.log(data);
    },
  });

  const clickSubmitHandler = () => {
    console.log(group);
    if (window.confirm("ยืนยันการสุ่มจะไม่สามารถเปลี่ยนแปลงได้")) {
      mutation.mutate(group);
    }
  };

  return (
    <div className="">
      {group.map((item, idx) => {
        return (
          <Fragment key={v4()}>
            <div className="border py-2 bg-gray-200 text-left my-2">
              <div className="mx-5 font-bold">
                {idx + 1}.{" "}
                {item.title ? item.title : "ยังไม่ตั้งชื่อหัวข้อโปรเจค"}
              </div>
              <div className="grid grid-cols-3">
                <div className="mx-5 my-3 text-center">
                  ที่ปรึกษา <br />
                  {item.boards.advisor.firstname === null
                    ? "ไม่มี"
                    : item.boards.advisor.firstname}
                </div>
                <div className="mx-5 my-3 text-center">
                  กรรมการสอบ <br />
                  {item.boards.board1.firstname === null
                    ? "ไม่มี"
                    : item.boards.board1.firstname}
                </div>
                <div className="mx-5 my-3 text-center">
                  กรรมการสอบ <br />
                  {item.boards.board2.firstname === null
                    ? "ไม่มี"
                    : item.boards.board2.firstname}
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

      {isRandom && (
        <div className="text-center my-5">
          <AddButton onClick={() => clickSubmitHandler()}>
            ยืนยันการสุ่ม
          </AddButton>
        </div>
      )}
    </div>
  );
};

export default ResultRandom;
