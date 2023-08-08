import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import DropdownFiles from "./DropdownFiles";
const RequestLogLists = ({ requestStatusAssign }) => {
  return (
    <div>
      <div className="text-center font-bold text-xl py-5 ">ประวัติการขอสอบ</div>

      <div className="grid grid-cols-5 py-1 text-center content-center ">
        <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
          ชื่อหัวข้อ
        </div>
        <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
          ประเภทหัวข้อ
        </div>
        <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
          สถานะ
        </div>
        <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
          ไฟล์
        </div>
        <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
          รายละเอียด
        </div>
      </div>
      {requestStatusAssign.length <= 0 ? (
            <div className="col-span-5 text-center text-xl py-2 border  ">ยังไม่มีประวัติการขอสอบ ณ ขณะนี้</div>
            ) : (
        <Fragment>
          {requestStatusAssign.map((item, idx) => {
            return (
              <Fragment key={item.id}>
                <div
                  className="grid grid-cols-5 py-1 text-center content-center "
                  key={item.id}
                >
                  <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
                    {item.title}
                  </div>
                  <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
                    {item.categories}
                  </div>
                  <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
                    {item.status}
                  </div>
                  <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
                    <DropdownFiles files={item.files} />
                  </div>
                  <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
                    <textarea
                      rows=""
                      cols=""
                      disabled
                      value={item.description}
                      className="p-1 bg-gray-100 rounded-xl"
                    ></textarea>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </Fragment>
      )}
    </div>
  );
};

export default RequestLogLists;
