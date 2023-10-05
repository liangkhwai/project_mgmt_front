import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const SidebarTeacher = () => {
  return (
    <Fragment>
      <li className="">
        <Link to="/dashboard/grouplist" className="">
          <div className="w-100 mb-3 flex pl-20 transition-colors duration-300 ease-in-out hover:text-blue-600">
            ข้อมูลกลุ่มโปรเจค
          </div>
        </Link>
      </li>
      <li className="">
        <Link to="/dashboard/calendar/book" className="">
          <div className="w-100 mb-3 flex pl-20 transition-colors duration-300 ease-in-out hover:text-blue-600">
            ลงชั่วโมงว่าง
          </div>
        </Link>
      </li>
      {/* <li className="">
        <Link to="/dashboard/calendar/view" className="">
          <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
            ชั่วโมงอาจารย์ว่าง
          </div>
        </Link>
      </li> */}
      <li className="">
        <Link to="/dashboard/exam/request" className="">
          <div className="w-100 mb-3 flex pl-20 transition-colors duration-300 ease-in-out hover:text-blue-600">
            รายการอนุมัติการขอสอบ
          </div>
        </Link>
      </li>
    </Fragment>
  );
};

export default SidebarTeacher;
