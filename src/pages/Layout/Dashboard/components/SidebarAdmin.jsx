import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const SidebarAdmin = () => {
  return (
    <Fragment>
      <label htmlFor="admin" className="mx-2 text-light-blue-700">
        Admin :{" "}
      </label>
      <ul id="admin" className="">
        <li className="">
          <Link to="/dashboard/researcher" className="">
            <div className="w-100 mb-3 flex pl-20 transition-colors duration-300 ease-in-out hover:text-blue-600">
              รายชื่อผู้วิจัย
            </div>
          </Link>
        </li>
        <li className="">
          <Link to="/dashboard/teacher" className="">
            <div className="w-100 mb-3 flex pl-20 transition-colors duration-300 ease-in-out hover:text-blue-600">
              รายชื่ออาจารย์
            </div>
          </Link>
        </li>
        <li className="">
          <Link to="/dashboard/random" className="">
            <div className="w-100 mb-3 flex pl-20 transition-colors duration-300 ease-in-out hover:text-blue-600">
              สุ่มกรรมการสอบ
            </div>
          </Link>
        </li>
        <li className="">
          <Link to="/dashboard/files/upload" className="">
            <div className="w-100 mb-3 flex pl-20 transition-colors duration-300 ease-in-out hover:text-blue-600">
              อัพโหลดไฟล์เอกสาร
            </div>
          </Link>
        </li>
        <li className="">
          <Link to="/dashboard/request/title" className="">
            <div className="w-100 mb-3 flex pl-20 transition-colors duration-300 ease-in-out hover:text-blue-600">
              รายการอนุมัติหัวข้อ
            </div>
          </Link>
        </li>
        <li className="">
          <Link to="/dashboard/exam/result" className="">
            <div className="w-100 flex pl-20 transition-colors duration-300 ease-in-out hover:text-blue-600">
              บันทึกผลการสอบ
            </div>
          </Link>
        </li>
      </ul>
      {/* end ul */}
      <label htmlFor="teacher" className="mx-2 text-light-blue-700">
        Teacher :{" "}
      </label>
      <ul id="teacher">
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

        <li className="">
          <Link to="/dashboard/exam/request" className="">
            <div className="w-100 mb-3 flex pl-20 transition-colors duration-300 ease-in-out hover:text-blue-600">
              รายการอนุมัติการขอสอบ
            </div>
          </Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default SidebarAdmin;
