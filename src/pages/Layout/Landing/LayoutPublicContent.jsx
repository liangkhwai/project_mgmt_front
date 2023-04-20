import React from "react";
import { Outlet, Link } from "react-router-dom";
import Header from "./Header";
const LayoutPublicContent = () => {
  return (
    <div className="">
      <Header/>
      <Outlet />
    </div>
  );
};

export default LayoutPublicContent;
