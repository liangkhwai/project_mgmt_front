import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
const LayoutDashboard = () => {
  const [open, setOpen] = useState(window.innerWidth > 640 ? true : false); // true

  const openHandler = () => {
    setOpen((prev) => !prev); // ค่าตรงข้ามของ open
    // setOpen(!open)

    console.log(open);

    // setOpen(!open);
  };
  return (
    <div className="flex">
      {/* Sidebar */}
      <div>
        <Sidebar isOpen={open} />
      </div>
      {/* Body */}
      <div className="flex flex-col w-full border ">
        <div>
          <Header openHandler={openHandler} />
        </div>
        <div className="bg-blue-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutDashboard;
