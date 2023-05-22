import React, { useState } from "react";
import { AddButton, DeleteButton } from "../../../../../UI/button";
import TableInsertRow from "./TableInsertRow";

const TableForm = () => {
  const [isInsert, setIsInsert] = useState(false);
  const [inputRow, setInputRow] = useState([{ value: "" }]);
  const insertNewRowHandler = () => {
    setInputRow([...inputRow, { value: "" }]);
  };

  const deleteNewRowHandler = () => {
    console.log(inputRow);
    setInputRow((prev) => {
      console.log(prev);
      const arr = [...prev]
      arr.pop()
      console.log(arr);

      return arr;
    });
  };

  return (
    <div>
      <div>
        รายละเอียดผู้วิจัย <span className="text-red-700">*</span>
      </div>
      <table className="table w-full ">
        <thead className="">
          <tr>
            <th>รหัสนักศึกษา</th>
            <th>ชื่อ</th>
            <th>นามสกุล</th>
            <th>เบอร์โทร</th>
            <th>E-mail</th>
            <th>เกรดเฉลี่ยเทอมล่าสุด</th>
          </tr>
        </thead>
        <tbody className="even:bg-gray-400">
          {inputRow.map((row) => (
            <tr>
              <td>
                {" "}
                <input
                  type="text"
                  className="w-full rounded-md"
                  value={row.value}
                />
              </td>
              <td>
                {" "}
                <input
                  type="text"
                  className="w-full rounded-md"
                  value={row.value}
                />
              </td>
              <td>
                {" "}
                <input
                  type="text"
                  className="w-full rounded-md"
                  value={row.value}
                />
              </td>
              <td>
                {" "}
                <input
                  type="text"
                  className="w-full rounded-md"
                  value={row.value}
                />
              </td>
              <td>
                {" "}
                <input
                  type="text"
                  className="w-full rounded-md"
                  value={row.value}
                />
              </td>
              <td>
                {" "}
                <input
                  type="text"
                  className="w-full rounded-md"
                  value={row.value}
                />
              </td>
            </tr>
          ))}
          {/* <tr>
            <td>
              <input type="text" className="w-full rounded-md" name="" id="" />
            </td>
            <td>
              <input type="text" className="w-full rounded-md" name="" id="" />
            </td>
            <td>
              <input type="text" className="w-full rounded-md" name="" id="" />
            </td>
            <td>
              <input type="text" className="w-full rounded-md" name="" id="" />
            </td>
            <td>
              <input type="text" className="w-full rounded-md" name="" id="" />
            </td>
            <td>
              <input type="text" className="w-full rounded-md" name="" id="" />
            </td>
          </tr> */}
          {/* <tr>
            <td>
              <input type="text" className="w-full rounded-md" name="" id="" />
            </td>
            <td>
              <input type="text" className="w-full rounded-md" name="" id="" />
            </td>
            <td>
              <input type="text" className="w-full rounded-md" name="" id="" />
            </td>
            <td>
              <input type="text" className="w-full rounded-md" name="" id="" />
            </td>
            <td>
              <input type="text" className="w-full rounded-md" name="" id="" />
            </td>
            <td>
              <input type="text" className="w-full rounded-md" name="" id="" />
            </td>
          </tr> */}
          {isInsert && <TableInsertRow />}
        </tbody>
      </table>
      <div className="text-end">
        <AddButton onClick={() => insertNewRowHandler()}>เพิ่มแถว</AddButton>
        <DeleteButton onClick={() => deleteNewRowHandler()}>ลบแถว</DeleteButton>
      </div>
      <div className="text-center">
        <AddButton>สร้าง</AddButton>
      </div>
    </div>
  );
};

export default TableForm;
