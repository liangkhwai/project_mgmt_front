import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
const Sidebar = ({ isOpen }) => {
  const maxHeight = window.innerHeight;
  return (
    <div
      className={`${
        isOpen ? "w-72 " : "w-0"
      } h-screen bg-white transition-all duration-300 `}
    >
      <aside
        className={`${
          isOpen ? "w-72 fixed" : "w-0"
        } h-screen bg-white transition-all duration-300 `}
      >
        <SimpleBar style={{ maxHeight: maxHeight }}>
          <div data-simplebar className="">
            {isOpen && (
              <Link to="/dashboard/index">
                <img
                  src={logo}
                  alt="eiei"
                  width="80%"
                  className="mb-5 p-2 mt-3 ml-auto mr-auto"
                />
              </Link>
            )}
            <ul>
              <li className="">
                <Link to="/dashboard" className="">
                  <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
                    Dashboard
                  </div>
                </Link>
              </li>
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
                <Link to="/dashboard/index" className="">
                  <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
                    Dashboard
                  </div>
                </Link>
              </li>
              <li className="">
                <Link to="/dashboard/index" className="">
                  <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
                    Dashboard
                  </div>
                </Link>
              </li>
              <li className="">
                <Link to="/dashboard/index" className="">
                  <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
                    Dashboard
                  </div>
                </Link>
              </li>
              <li className="">
                <Link to="/dashboard/index" className="">
                  <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
                    Dashboard
                  </div>
                </Link>
              </li>
            </ul>
            {/* <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div> */}
          </div>
        </SimpleBar>
      </aside>
    </div>
  );
};

export default Sidebar;
