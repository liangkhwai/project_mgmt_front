import React, { useEffect, useState, useContext } from "react";
import logo from "../../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { checkAuth, logout } from "../../../loader/auth";
import AuthContext from "../../../context/auth";
const Header = () => {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const logoutHandler = () => {
    ctx.logoutHandler().then(() => navigate("/"));
  };

  return (
    <div>
      <div className="w-full bg-blue-800 h-11 flex justify-end ">
        {ctx.isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              className="flex items-center px-3 text-white "
            >
              <div className="">
                <button>Dashboard</button>
              </div>
            </Link>
            <Link to="/login" className="flex items-center px-3 text-white ">
              <div className="">
                <button onClick={logoutHandler}>ออกจากระบบ</button>
              </div>
            </Link>
          </>
        ) : (
          <Link to="/login" className="flex items-center px-3 text-white ">
            <div className="">
              <button>เข้าสู่ระบบ</button>
            </div>
          </Link>
        )}
      </div>
      <div className="w-full bg-white border shadow-md">
        <div className="">
          <div className="mt-10 mx-32 ">
            <img src={logo} alt="" className="src" width="30%" />
            <ul className="flex gap-11 ml-14 my-8 sm:flex-row flex-col">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-600 duration-300 transition-colors"
                >
                  <div>หน้าหลัก</div>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-blue-600 duration-300 transition-colors"
                >
                  <div>สืบค้น</div>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-blue-600 duration-300 transition-colors"
                >
                  <div>คำถามที่พบบ่อย</div>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-blue-600 duration-300 transition-colors"
                >
                  <div>ติดต่อเรา</div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
