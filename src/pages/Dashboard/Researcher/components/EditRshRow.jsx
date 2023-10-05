import React from "react";
import ToggleSwitch from "./ToggleSwitch";
import { scryRenderedDOMComponentsWithTag } from "react-dom/test-utils";

const EditRshRow = ({
  rsh,
  editFormHandler,
  cancelEditFormHandler,
  editFormSubmitHandler,
  editSelectedRoom,
  roomData,
  idx,
  grpDetail,
}) => {
  console.log("edit = ", rsh);
  return (
    <tr className="text-center ">
      <td>{idx + 1}</td>
      <td>
        <input
          className="w-full "
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
        <select
          name=""
          id=""
          onChange={(e) => editSelectedRoom(e)}
          value={rsh.categorieRoomId}
        >
          {roomData.map((data, idx) => (
            <option key={idx} value={data.id}>
              {`${data.room} (${data.year.substring(2)})`}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          className="w-full"
          type="tel"
          name="tel"
          id=""
          value={rsh.tel}
          onChange={(e) => editFormHandler(e)}
        />
      </td>
      {/* <td>
        <input
          className="w-full"
          type="email"
          name="email"
          id=""
          value={rsh.email}
          onChange={(e) => editFormHandler(e)}
        />
      </td> */}
      <td>
        <input
          className="w-full"
          type="number"
          name="grade"
          id=""
          value={rsh.grade}
          onChange={(e) => editFormHandler(e)}
        />
      </td>
      <td>{grpDetail?.status}</td>

      <td className={`${rsh.isEditGradeProject ? "bg-gray-400" : ""}`}>
        {rsh.isEditGradeProject === false ||
        rsh.grade_project === "F" ||
        (rsh.isLate === true && rsh.isEditGradeProject === false) ? (
          <input
            className="w-full"
            type="text"
            name="grade_project"
            id=""
            value={rsh.grade_project}
            onChange={(e) => editFormHandler(e)}
          />
        ) : (
          <div className="">{rsh.grade_project}</div>
        )}
      </td>
      <td>
        <input
          type="checkbox"
          name="isLate"
          id=""
          checked={rsh.isLate}
          onChange={(e) => editFormHandler(e)}
        />
      </td>
      <td>
        <input
          type="checkbox"
          name="waitRegister"
          id=""
          checked={rsh.waitRegister}
          onChange={(e) => editFormHandler(e)}
        />
      </td>
      <td>
        <ToggleSwitch
          rsh={rsh}
          isView={false}
          editFormHandler={editFormHandler}
        />
      </td>
      <td>
        {/* <div className="flex justify-evenly"> */}
        <button
          className="rounded bg-yellow-400 px-3 py-2 text-white"
          onClick={() => editFormSubmitHandler()}
        >
          บันทึก
        </button>
      </td>
      <td>
        <button
          className="rounded bg-red-500 px-3 py-2 text-white "
          onClick={() => cancelEditFormHandler()}
        >
          ยกเลิก
        </button>
        {/* </div> */}
      </td>
    </tr>
  );
};

export default EditRshRow;
