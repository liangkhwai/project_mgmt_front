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

  return (
    <div className="shadow-md flex item-center h-14 justify-between">
      <div className="flex items-center gap-4">
        <button onClick={openHandler} className="ml-5">
          <AiOutlineMenuUnfold size="2em" color="grey" />
        </button>
        {/* <div className="">Search input</div> */}
      </div>
      <div className="flex items-center gap-4">
        <div>NotificationsMenu</div>
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
