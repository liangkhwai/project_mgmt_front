import React from "react";

const HeaderFilter = ({
  dataRoomList,
  filteredHandler,
  filterRoom,
  filterRoomRef,
  
}) => {
  return (
    <div className="w-full bg-gray-50 border  shadow-lg rounded-b-2xl rounded-tr-2xl ">
      <div className="m-5">
        <div className="flex flex-col">
          <div className="flex justify-center gap-6 w-full text-center py-4 border border-gray-300 border-b-0 rounded-t-md  ">
            <div>โปรแกรมวิชา :</div>
            <select
              className="rounded w-40 text-center"
              onChange={(e) => filteredHandler(e.target.value)}
            >
              <option value="all" defaultChecked>
                ทั้งหมด
              </option>
              <option value="N">BIS/N</option>
              <option value="R">BIS/R</option>
              <option value="Q">BIS/Q</option>
            </select>
          </div>
          <div className="flex justify-center gap-6 w-full text-center py-4 border border-gray-300 rounded-b-md">
            <div>กลุ่มนักศึกษา :</div>
            <select
              ref={filterRoomRef}
              className="rounded w-40 text-center"
              onChange={(e) => filterRoom(e.target.value)}
            >
              <option value="all" defaultChecked>
                ทั้งหมด
              </option>

              {dataRoomList.map((data, idx) => (
                <option key={idx} value={data.id}>
                  {`${data.room}(${data.year.substring(2)})`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderFilter;
