import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const SidebarResearcher = () => {
  return (
    <Fragment>
      <li className="">
        <Link to="/dashboard/researcher" className="">
          <div className="w-100 mb-3 flex pl-20 transition-colors duration-300 ease-in-out hover:text-blue-600">
            รายชื่อผู้วิจัย
          </div>
        </Link>
      </li>
      <li className="">
        <Link to="/dashboard/grouplist" className="">
          <div className="w-100 mb-3 flex pl-20 transition-colors duration-300 ease-in-out hover:text-blue-600">
            ข้อมูลกลุ่มโปรเจค
          </div>
        </Link>
      </li>
      <li>
        <Link to="/dashboard/group">
          <div className="w-100 mb-3 flex pl-20 transition-colors duration-300 ease-in-out hover:text-blue-600">
            จัดการข้อมูลกลุ่มโปรเจค
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
          <div className="w-100 mb-3 flex pl-20 transition-colors duration-300 ease-in-out hover:text-blue-600">
            ขอยื่นสอบปริญญานิพนธ์
          </div>
        </Link>
      </li>
      <li className="">
        <Link to="/dashboard/exam/booking" className="">
          <div className="w-100 mb-3 flex pl-20 transition-colors duration-300 ease-in-out hover:text-blue-600">
            จองเวลาสอบปริญญานิพนธ์
          </div>
        </Link>
      </li>
      <li className="">
        <Link to="/dashboard/thesis/upload" className="">
          <div className="w-100 mb-3 flex pl-20 transition-colors duration-300 ease-in-out hover:text-blue-600">
            อัปโหลดปริญญานิพนธ์
          </div>
        </Link>
      </li>
    </Fragment>
  );
};

export default SidebarResearcher;
