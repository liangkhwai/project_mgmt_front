import React from "react";

const InsertResearcherRow = ({
  cancelInsertHadnler,
  insertFormHandler,
  insertFormSubmitHandler,
  insertSelectedRoom,
  roomData,
  roomSelected,
  insertSelectorRoom,
  insertMenuRoom,
}) => {
  return (
    <tr>
      <td colSpan={2}>
        <input
          className="w-full"
          type="text"
          name="student_id"
          id=""
          onChange={(e) => insertFormHandler(e)}
          placeholder="รหัสนักศึกษา"
        />
      </td>
      <td>
        <input
          className="w-full"
          type="text"
          name="firstname"
          id=""
          onChange={(e) => insertFormHandler(e)}
          placeholder="ชื่อ"
        />
      </td>
      <td>
        <input
          className="w-full"
          type="text"
          name="lastname"
          id=""
          onChange={(e) => insertFormHandler(e)}
          placeholder="นามสกุล"
        />
      </td>
      <td>
        <select
          name=""
          id=""
          onChange={(e) => insertSelectedRoom(e)}
          value={insertSelectorRoom}
        >
          {insertMenuRoom.map((data, idx) => (
            <option key={idx} value={data.id}>
              {`${data.room} (${data.year.substring(2)})`}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          className="w-full"
          type="text"
          name="email"
          id=""
          onChange={(e) => insertFormHandler(e)}
          placeholder="อีเมลล์"
        />
      </td>
      <td>
        <input
          className="w-full"
          type="text"
          name="tel"
          id=""
          onChange={(e) => insertFormHandler(e)}
          placeholder="เบอร์โทร"
        />
      </td>
      <td>
        <input
          className="w-full"
          type="text"
          name="grade"
          id=""
          onChange={(e) => insertFormHandler(e)}
          placeholder="เกรด"
        />
      </td>
      <td className="text-center" colSpan={4}>
        <button
          className="px-4 py-2 bg-green-600 rounded-xl mx-1 text-white shadow-sm"
          onClick={() => insertFormSubmitHandler()}
        >
          เพิ่ม
        </button>
        <button
          className="px-4 py-2 bg-red-600 rounded-xl mx-1 text-white shadow-sm"
          onClick={() => cancelInsertHadnler()}
        >
          ยกเลิก
        </button>
      </td>
    </tr>
  );
};

export default InsertResearcherRow;
