import React from "react";

const HeaderButtonChange = ({ setHeadSelected, headSelected }) => {
  let researcherButton = "";
  let teacherButton = "";
  if (headSelected === "researcher") {
    researcherButton = "bg-blue-800 text-white";
    teacherButton = "bg-white text-blue-800";
  } else {
    researcherButton = "bg-white text-blue-800";
    teacherButton = "bg-blue-800 text-white";
  }

  const headSelectorChangeHandler = (val) => {
    // console.log(val);
    setHeadSelected(val);
  };

  return (
    <div className="flex">
      <button
        onClick={() => headSelectorChangeHandler("researcher")}
        className={`w-fit px-3 py-2 rounded-t-md ${researcherButton}`}
      >
        สำหรับผู้วิจัย
      </button>
      <button
        onClick={() => headSelectorChangeHandler("teacher")}
        className={` w-fit px-3 py-2 rounded-t-md ${teacherButton}`}
      >
        สำหรับอาจารย์
      </button>
    </div>
  );
};

export default HeaderButtonChange;
