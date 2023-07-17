import React from "react";

const HeaderButton = ({ setMenu, menu }) => {
  const clickHandler = (val) => {
    setMenu(val);
  };

  let bg1 = "";
  let bg2 = "";
  if (menu === "filter") {
    bg1 = "bg-blue-800 text-white";
    bg2 = "text-blue-800";
  } else {
    bg1 = "text-blue-800";
    bg2 = "text-white bg-blue-800";
  }

  return (
    <div className="flex ">
      <button
        className={` px-10 py-2  rounded-t-md ${bg1}`}
        onClick={() => clickHandler("filter")}
      >
        เรียกดูข้อมูล
      </button>
      <button
        className={`px-10 py-2   rounded-t-md ${bg2}`}
        onClick={() => clickHandler("addcategories")}
      >
        เพื่มหมวดหมู่นักศึกษา
      </button>
    </div>
  );
};

export default HeaderButton;
