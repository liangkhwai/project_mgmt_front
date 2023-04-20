import React from "react";
import logo from "../../../assets/logo.png";
import {Link,useNavigate} from 'react-router-dom'
const Header = () => {




  return (
    <div>
      <div className="w-full bg-blue-800 h-11"></div>
      <div className="w-full bg-white border shadow-md">
        <div className="">
          <div className="mt-10 mx-32 ">
            <img src={logo} alt="" className="src" width="30%" />
            <ul className="flex gap-11 ml-14 my-8 sm:flex-row flex-col">
              <li>
                <Link to='#' className="hover:text-blue-600 duration-300 transition-colors"><div>หน้าหลัก</div></Link>
              </li>
              <li>
              <Link to='#' className="hover:text-blue-600 duration-300 transition-colors"><div>สืบค้น</div></Link>
              </li>
              <li>
              <Link to='#' className="hover:text-blue-600 duration-300 transition-colors"><div>คำถามที่พบบ่อย</div></Link>
              </li>
              <li>
              <Link to='#' className="hover:text-blue-600 duration-300 transition-colors"><div>ติดต่อเรา</div></Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
