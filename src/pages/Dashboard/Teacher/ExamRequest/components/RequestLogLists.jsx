import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const RequestLogLists = ({ requestStatusAssign }) => {
  return (
    <div>
      <div className="text-center font-bold text-xl py-5 ">ประวัติการขอสอบ</div>

      <div className="grid grid-cols-4 py-1 text-center content-center ">
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
          รายละเอียด
        </div>
      </div>
      {requestStatusAssign.map((item, idx) => {
        return (
          <Fragment>
            <div
              className="grid grid-cols-4 py-1 text-center content-center "
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
                {item.description}
              </div>
            </div>
            {item.files && (
              <ul className="list-disc col-span-4 list-inside">
                {item.files.map((item) => {
                  return (
                    <li className="p-2  py-2 text-start">
                      <Link
                        className="bg-light-blue-200 p-2 rounded-md"
                        target="_blank"
                        to={`http://localhost:8080/files/request/${item.originalname}`}
                      >
                        {item.originalname}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default RequestLogLists;
