import React from "react";
import xlsxIcon from "../../../../assets/xlsx_icon.svg";
import CategorieSelected from "./CategorieSelected";
const FileDetail = ({
  file,
  onClose,
  submit,
  roomSelected,
  roomData,
  selectorHandler,
}) => {
  console.log(file);
  return (
    <div className="">
      <div className="flex justify-center">
        <div>
          <img src={xlsxIcon} alt="" width="250px" className="" />
        </div>
      </div>
      <div className="my-5 text-center">{file ? file.name : null}</div>
      <div className="my-5">
        <CategorieSelected
          roomSelected={roomSelected}
          roomData={roomData}
          selectorHandler={selectorHandler}
        />
      </div>

      <div className="flex justify-end gap-1">
        <button
          type="submit"
          className="px-5 py-2 bg-green-500"
          onClick={submit}
        >
          เพิ่ม
        </button>
        <button className="px-5 py-2 bg-gray-200" onClick={onClose}>
          ยกเลิก
        </button>
      </div>
    </div>
  );
};

export default FileDetail;
