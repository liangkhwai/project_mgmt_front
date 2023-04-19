import React from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai/index";
const Header = ({ openHandler }) => {
  return (
    <div className="shadow-md flex item-center h-14">
      <button onClick={openHandler} className="ml-5">
        <AiOutlineMenuUnfold size="2em" color="grey" />
      </button>
      <div className="flex items-center align-middle">Header</div>
    </div>
  );
};

export default Header;
