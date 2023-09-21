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
            ข้อมูลกลุ่มโปรเจค
          </div>
        </Link>
      </li>

      <li className="">
        <Link to="/dashboard/random" className="">
          <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
            สุ่มกรรมการสอบ
          </div>
        </Link>
      </li>
      <li className="">
        <Link to="/dashboard/files/upload" className="">
          <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
          อัพโหลดไฟล์เอกสาร
          </div>
        </Link>
      </li>
      <li className="">
        <Link to="/dashboard/calendar/book" className="">
          <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
            ลงชั่วโมงว่าง
          </div>
        </Link>
      </li>
      <li className="">
        <Link to="/dashboard/exam/request" className="">
          <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
            รายการอนุมัติการขอสอบ
          </div>
        </Link>
      </li>
      <li className="">
        <Link to="/dashboard/exam/result" className="">
          <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
            บันทึกผลการสอบ
          </div>
        </Link>
      </li>
    </Fragment>
  );
};

export default SidebarAdmin;
