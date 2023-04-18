import React from "react";
import { Outlet, Link } from "react-router-dom";
const LayoutPublicContent = () => {
  return (
    <div className="text-center">
      {/* Layout Page public
      <br />
      <Link to="/dashboard">
        <button className="p-3 rounded-xl bg-black text-white">
          Go to Dashboard
        </button>
      </Link> */}
      <Outlet />
    </div>
  );
};

export default LayoutPublicContent;
