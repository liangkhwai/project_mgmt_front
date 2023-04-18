import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
const LayoutDashboard = () => {
  const [open, setOpen] = useState(window.innerWidth > 640 ? true : false);

  const openHandler = () => {
    setOpen((prev) => !prev);
    console.log(open);
    // setOpen(!open);
  };
  return (
    <div className="flex">
      {/* Sidebar */}
      <div>
        <Sidebar isOpen={open} openHandler={openHandler}/>
      </div>
      {/* Body */}
      <div className="flex flex-col w-full border border-red-600">
        <Header openHandler={openHandler} />
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutDashboard;
