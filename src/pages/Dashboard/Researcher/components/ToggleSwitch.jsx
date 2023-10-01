import React, { useState } from "react";

const ToggleSwitch = ({ rsh, isView, editFormHandler }) => {
  console.log(rsh);
  const [isChecked, setIsChecked] = useState(rsh.isActive);

  const handleToggle = (e) => {
    console.log(e);
    editFormHandler(e);
    setIsChecked((prev) => !prev);
  };

  return (
    <label className="flex w-full cursor-pointer items-center justify-center">
      <div className="relative">
        <input
          type="checkbox"
          name="isActive"
          className="hidden"
          checked={isChecked}
          onChange={(e) => handleToggle(e)}
          disabled={isView}
        />
        <div
          className={`h-6 w-10 rounded-full shadow-inner ${
            isChecked ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          <div
            className={` absolute h-6 w-6 transform rounded-full bg-white shadow-md ${
              isChecked
                ? "translate-x-6 transition-transform "
                : "translate-x--6 transition-transform"
            }`}
          ></div>
        </div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
