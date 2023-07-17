import React from "react";
import { AddButton, CancelButton } from "../../../../UI/button";

const InsertTeacherRow = ({ setInsertFormData, cancelInsertRow,insertFormDataSubmitHandler }) => {
  const insertFormDataChangeHandler = (e) => {
    const name = e.target.name;
    const val = e.target.value;

    setInsertFormData((prev) => ({ ...prev, [name]: val }));
  };

  return (
    <tr>
      <td className="py-1 border-b-2 border-l-2 border-gray-300">
        {" "}
        <input
          type="text"
          name="prefix"
          id=""
          className="w-full"
          placeholder="คำนำหน้า"
          onChange={(e) => insertFormDataChangeHandler(e)}
        />
      </td>
      <td className="py-1 border-b-2 border-gray-300">
        {" "}
        <input
          type="text"
          name="firstname"
          id=""
          className="w-full"
          placeholder="ชื่อ"
          onChange={(e) => insertFormDataChangeHandler(e)}
        />
      </td>
      <td className="py-1 border-b-2 border-gray-300">
        {" "}
        <input
          type="text"
          name="lastname"
          id=""
          className="w-full"
          placeholder="นามสกุล"
          onChange={(e) => insertFormDataChangeHandler(e)}
        />
      </td>
      <td className="py-1 border-b-2 border-gray-300">
        {" "}
        <input
          type="text"
          name="email"
          id=""
          className="w-full"
          placeholder="อีเมลล์"
          onChange={(e) => insertFormDataChangeHandler(e)}
        />
      </td>
      <td className="py-1 border-b-2 border-gray-300">
        {" "}
        <input
          type="text"
          name="tel"
          id=""
          className="w-full"
          placeholder="เบอร์โทร"
          onChange={(e) => insertFormDataChangeHandler(e)}
        />
      </td>
      <td className="py-1 border-b-2 border-gray-300">
        {" "}
        <input
          type="text"
          name="line_id"
          id=""
          className="w-full"
          placeholder="Line Id"
          onChange={(e) => insertFormDataChangeHandler(e)}
        />
      </td>
      <td className="border-2 border-gray-300">
        {" "}
        <AddButton onClick={()=>insertFormDataSubmitHandler()}>เพิ่ม</AddButton>
      </td>
      <td className="border-2 border-gray-300">
        {" "}
        <CancelButton onClick={() => cancelInsertRow()}>ยกเลิก</CancelButton>
      </td>
    </tr>
  );
};

export default InsertTeacherRow;
