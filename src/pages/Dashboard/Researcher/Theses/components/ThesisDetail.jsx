import React from "react";

const ThesisDetail = ({ groupInfo, groupMember, boards }) => {
  //   console.log(groupMember);
  return (
    <form>
      <div className="w-full">
        <div className="border rounded-t-xl border-b-blue-100 ">
          <div className="px-10 w-full">
            <div className="grid grid-cols-6 my-5">
              <div className="font-bold text-blue-300 col-span-2 self-center">
                ชื่อหัวข้อ
              </div>
              <div className="col-span-4">{groupInfo?.title}</div>
            </div>
          </div>
        </div>
        <div className="border border-t-transparent border-b-blue-100">
          <div className="px-10 w-full">
            <div className="grid grid-cols-6 my-5">
              <div className="font-bold text-blue-300 col-span-2 self-center">
                ผู้จัดทำ
              </div>
              <div className="col-span-4">
                {groupMember?.map((item, idx) => {
                  return (
                    <div key={idx}>
                      {item.firstname} {item.lastname}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="border border-t-transparent border-b-blue-100">
          <div className="px-10 w-full">
            <div className="grid grid-cols-6 my-5">
              <div className="font-bold text-blue-300 col-span-2 self-center">
                Abstract
              </div>
              <div className="col-span-4">
                <textarea
                  required
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  className="w-full px-2 rounded-xl"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-t-transparent border-b-blue-100">
          <div className="px-10 w-full">
            <div className="grid grid-cols-6 my-5">
              <div className="font-bold text-blue-300 col-span-2 self-center">
                อาจารย์ที่ปรึกษา
              </div>
              <div className="col-span-4">
                {boards
                  .filter((item) => item.role === "advisor")
                  .map(
                    (item, idx) =>
                      "อาจารย์ " +
                      item.prefix +
                      item.firstname +
                      " " +
                      item.lastname
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ThesisDetail;
