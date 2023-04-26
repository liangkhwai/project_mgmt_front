import React from "react";
import xlsxIcon from "../../../../assets/xlsx_icon.svg";
const FileDetail = ({ file, onClose, submit }) => {
  console.log(file);
  return (
    <div>
      <div>
        <img src={xlsxIcon} alt="" />
      </div>
      <div className="my-5 text-center">{file ? file.name : null}</div>

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
