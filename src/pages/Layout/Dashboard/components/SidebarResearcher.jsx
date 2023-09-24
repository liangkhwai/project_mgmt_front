import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const SidebarResearcher = () => {
  return (
    <Fragment>
      {/* <li className="">
        <Link to="/dashboard/" className="">
          <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
            Dashboard
          </div>
        </Link>
      </li> */}
      <li>
        <Link to="/dashboard/group">
          <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
            ข้อมูลกลุ่มโปรเจค
          </div>
        </Link>
      </li>
      {/* <li className="">
        <Link to="/dashboard/group/create" className="">
          <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
            จัดการกลุ่ม
          </div>
        </Link>
      </li> */}
     
      <li className="">
        <Link to="/dashboard/request/exam" className="">
          <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
          ขอยื่นสอบปริญญานิพนธ์
          </div>
        </Link>
      </li>
      <li className="">
        <Link to="/dashboard/exam/booking" className="">
          <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
          จองเวลาสอบปริญญานิพนธ์
          </div>
        </Link>
      </li>
      <li className="">
        <Link to="/dashboard/thesis/upload" className="">
          <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
          อัพโหลดวิทยานิพนธ์
          </div>
        </Link>
      </li>
    </Fragment>
  );
};

export default SidebarResearcher;
