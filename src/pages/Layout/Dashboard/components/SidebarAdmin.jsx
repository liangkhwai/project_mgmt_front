import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const SidebarAdmin = () => {
  return (
    <Fragment>
      <li className="">
        <Link to="/dashboard/researcher" className="">
          <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
            รายชื่อผู้วิจัย
          </div>
        </Link>
      </li>
      <li className="">
        <Link to="/dashboard/teacher" className="">
          <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
            รายชื่ออาจารย์
          </div>
        </Link>
      </li>
      <li className="">
        <Link to="/dashboard/grouplist" className="">
          <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
            กลุ่มนักศึกษา
          </div>
        </Link>
      </li>
      <li className="">
        <Link to="/dashboard/calendar/view" className="">
          <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
            ชั่วโมงอาจารย์ว่าง
          </div>
        </Link>
      </li>
      <li className="">
        <Link to="/dashboard/random" className="">
          <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
            สุ่มกลุ่มโปรเจค
          </div>
        </Link>
      </li>
      <li className="">
        <Link to="/dashboard/files/upload" className="">
          <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
            ไฟล์
          </div>
        </Link>
      </li>
    </Fragment>
  );
};

export default SidebarAdmin;
