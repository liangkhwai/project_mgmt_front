import React from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai/index";
const Header = ({ openHandler }) => {
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
        <div className="mr-5">AvatarMenu</div>
      </div>
    </div>
  );
};

export default Header;
