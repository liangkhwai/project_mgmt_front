import React from "react";

const Header = ({ openHandler }) => {
  return (
    <div className="border border-red-600">
      Header
      <button onClick={openHandler}>Open ?</button>
    </div>
  );
};

export default Header;
