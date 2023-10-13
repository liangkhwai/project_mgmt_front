import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import DropdownFiles from "./DropdownFiles";
import dayjs from "dayjs";
const RequestLogLists = ({ requestStatusAssign }) => {
  return (
    <div>
      <div className="py-5 text-center text-xl font-bold ">ประวัติการขอสอบ</div>

      <div className="grid grid-cols-6 content-center py-1 text-center ">
        <div className="flex w-full items-center justify-center bg-light-blue-200 py-4">
          ชื่อหัวข้อ
        </div>
        <div className="flex w-full items-center justify-center bg-light-blue-200 py-4">
          ประเภทหัวข้อ
        </div>
        <div className="flex w-full items-center justify-center bg-light-blue-200 py-4">
          สถานะ
        </div>
        <div className="flex w-full items-center justify-center bg-light-blue-200 py-4">
          ไฟล์
        </div>
        <div className="flex w-full items-center justify-center bg-light-blue-200 py-4">
          เวลาที่บันทึก
        </div>
        <div className="flex w-full items-center justify-center bg-light-blue-200 py-4">
          รายละเอียด
        </div>
      </div>
      {requestStatusAssign.length <= 0 ? (
        <div className="col-span-5 border py-2 text-center text-xl  ">
          ยังไม่มีประวัติการขอสอบ ณ ขณะนี้
        </div>
      ) : (
        <Fragment>
          {requestStatusAssign.map((item, idx) => {
            return (
              <Fragment key={item.id}>
                <div
                  className="grid grid-cols-6 content-center py-1 text-center "
                  key={item.id}
                >
                  <div className="flex w-full items-center justify-center bg-gray-200 py-4">
                    {item.title}
                  </div>
                  <div className="flex w-full items-center justify-center bg-gray-200 py-4">
                    {item.categories}
                  </div>
                  <div className="flex w-full items-center justify-center bg-gray-200 py-4">
                    {item.status}
                  </div>
                  <div className="flex w-full items-center justify-center bg-gray-200 py-4">
                    <DropdownFiles files={item.files} />
                  </div>
                  <div className="flex w-full items-center justify-center bg-gray-200 py-4">
                    {dayjs(item.updatedAt).format("DD/MM/YYYY HH:mm")}
                  </div>
                  <div className="flex w-full items-center justify-center bg-gray-200 py-4">
                    <textarea
                      disabled
                      value={item.description}
                      className="w-full rounded-xl bg-gray-100"
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
