import React, { useContext } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai/index";
import { redirect, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/auth";
const Header = ({ openHandler }) => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    ctx.logoutHandler().then(() => navigate("/"));
  };

  const lineNotify = async () => {
    window.open("http://localhost:1234/auth", "_self");
  };

  return (
    <div className="shadow-md flex item-center h-14 justify-between">
      <div className="flex items-center gap-4">
        <button onClick={openHandler} className="ml-5">
          <AiOutlineMenuUnfold size="2em" color="grey" />
        </button>
        {/* <div className="">Search input</div> */}
      </div>
      <div className="flex items-center gap-4">
        {/* <div>NotificationsMenu</div> */}
        {ctx.role === "teacher" && (
          <div>
            <button
              className="px-4 py-2 bg-green-500 rounded-xl text-white"
              onClick={lineNotify}
            >
              เปิดแจ้งเตือนขึ้นสอบ
            </button>
          </div>
        )}

        <div className="">{ctx.getUsername()}</div>
        <button
          className="mr-5 bg-gray-300 p-2 rounded-xl "
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
