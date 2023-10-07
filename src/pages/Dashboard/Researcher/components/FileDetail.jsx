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
  isLoadingXlsx,
}) => {
  console.log(file);
  if (isLoadingXlsx) {
    return (
      <div className="flex h-32 w-full items-center justify-center">
        <div className="h-20 w-20 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    );
  }
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
          className="bg-green-500 px-5 py-2"
          onClick={submit}
        >
          เพิ่ม
        </button>
        <button className="bg-gray-200 px-5 py-2" onClick={onClose}>
          ยกเลิก
        </button>
      </div>
    </div>
  );
};

export default FileDetail;
