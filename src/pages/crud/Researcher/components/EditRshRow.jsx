import React from "react";

const EditRshRow = ({
  rsh,
  editFormHandler,
  cancelEditFormHandler,
  editFormSubmitHandler,
}) => {
  return (
    <tr className="text-center">
      <td>
        <input
          className="w-full"
          type="text"
          name="student_id"
          id=""
          value={rsh.student_id}
          onChange={(e) => editFormHandler(e)}
        />
      </td>
      <td>
        <input
          className="w-full"
          type="text"
          name="firstname"
          id=""
          value={rsh.firstname}
          onChange={(e) => editFormHandler(e)}
        />
      </td>
      <td>
        <input
          className="w-full"
          type="text"
          name="lastname"
          id=""
          value={rsh.lastname}
          onChange={(e) => editFormHandler(e)}
        />
      </td>
      <td>
        <input
          className="w-full"
          type="text"
          name="email"
          id=""
          value={rsh.email}
          onChange={(e) => editFormHandler(e)}
        />
      </td>
      <td>
        <input
          className="w-full"
          type="text"
          name="tel"
          id=""
          value={rsh.tel}
          onChange={(e) => editFormHandler(e)}
        />
      </td>
      <td>
        <input
          className="w-full"
          type="text"
          name="grade"
          id=""
          value={rsh.grade}
          onChange={(e) => editFormHandler(e)}
        />
      </td>
      <td>
        <button
          className="px-3 py-2 rounded bg-yellow-400 text-black"
          onClick={() => editFormSubmitHandler()}
        >
          บันทึก
        </button>
      </td>
      <td>
        <button
          className="px-3 py-2 rounded bg-red-500 text-black"
          onClick={() => cancelEditFormHandler()}
        >
          ยกเลิก
        </button>
      </td>
    </tr>
  );
};

export default EditRshRow;
