import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import AuthContext from "../../../context/auth";
import SidebarTeacher from "./components/SidebarTeacher";
import SidebarResearcher from "./components/SidebarResearcher";
import SidebarAdmin from "./components/SidebarAdmin";
const Sidebar = ({ isOpen }) => {
  const ctx = useContext(AuthContext);
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
              <Link to="/dashboard/">
                <img
                  src={logo}
                  alt="eiei"
                  width="80%"
                  className="mb-5 p-2 mt-3 ml-auto mr-auto"
                />
              </Link>
            )}
            <ul>
              {/* <li className="">
                <Link to="/dashboard" className="">
                  <div className="w-100 flex pl-20 hover:text-blue-600 transition-colors mb-3 ease-in-out duration-300">
                    Dashboard
                  </div>
                </Link>
              </li> */}
              {ctx.role === "researcher" ? (
                <SidebarResearcher />
              ) : ctx.role === "teacher" ? (
                <SidebarTeacher />
              ) : (
                <SidebarAdmin />
              )}
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
