import React from "react";

const HeaderResearcher = () => {
  return (
    <div className="">
      <div className="flex ">
        <button className="text-white bg-blue-800 px-10 py-2  rounded-t-md">
          เรียกดูข้อมูล
        </button>
        <button className="px-10 py-2 text-blue-800  rounded-t-md ">
          เพื่อหมวดหมู่นักศึกษา
        </button>
      </div>
      <div className="w-full bg-gray-50 border  shadow-lg rounded-b-2xl rounded-tr-2xl ">
        <div className="m-5">
          <div className="flex flex-col">
            <div className="flex justify-center gap-6 w-full text-center py-4 border border-gray-300 border-b-0 rounded-t-md  ">
              <div>โปรแกรมวิชา :</div>
              <select
                className="rounded w-40 text-center"
                onChange={(e) => console.log(e.target.value)}
              >
                <option value="all" defaultChecked>
                  ทั้งหมด
                </option>
                <option value="R">BIS/R</option>
                <option value="N">BIS/N</option>
              </select>
            </div>
            <div className="flex justify-center gap-6 w-full text-center py-4 border border-gray-300 rounded-b-md">
              <div>กลุ่มนักศึกษา :</div>
              <select
                className="rounded w-40 text-center"
                onChange={(e) => console.log(e.target.value)}
              >
                <option value="all" defaultChecked>
                  ทั้งหมด
                </option>
                <option value="N3">BISN3</option>
                <option value="N4">BISN4</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderResearcher;
