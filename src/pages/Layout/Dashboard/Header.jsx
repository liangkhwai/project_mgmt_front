import React from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai/index";
import { logout } from "../../Dashboard/components/Logout";
import { useNavigate } from "react-router-dom";
const Header = ({ openHandler }) => {
  const navigate = useNavigate()
  const logoutHandle = ()=>{
    logout()
    navigate('/login')
  }
  return (
    <div className="shadow-md flex item-center h-14 justify-between">
      <div className="flex items-center gap-4">
        <button onClick={openHandler} className="ml-5">
          <AiOutlineMenuUnfold size="2em" color="grey" />
        </button>
        <div className="">Search input</div>
      </div>
      <div className="flex items-center gap-4">
        <div>NotificationsMenu</div>
        <div className="">AvatarMenu</div>
        <button className="mr-5 bg-gray-300 p-2 rounded-xl " onClick={logoutHandle}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
