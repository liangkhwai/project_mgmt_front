import React, { useContext, useState } from "react";
import AuthContext from "../../../../../../context/auth";
import { RiVipCrown2Fill } from "react-icons/ri/index";
import { useEffect } from "react";

const Member = ({
  grpDetail,
  rsh,
  idx,
  deleteFromGroupHandler,
  changeLeaderClick,
  grpId,
  setGroupMember,
  groupMember,
}) => {
  const ctx = useContext(AuthContext);
  const [isTermEdit, setIsTermEdit] = useState(false);
  const editHandlerClick = async (grpId, rshId) => {
    setIsTermEdit(true);
  };

  useEffect(() => {
    console.log(groupMember);
  }, [groupMember]);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setGroupMember((prevData) => {
      const updatedData = prevData.map((item) => {
        if (item.id === rsh.id) {
          return { ...item, [name]: value };
        }
        return item;
      });
      return updatedData;
    });
  };

  const updateMemberGroup = async (rsh) => {
    const res = await fetch(`http://localhost:8080/researcher/update`, {
      method: "put",
      body: JSON.stringify({ ...rsh }),
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  };

  const handleOnBlur = (e) => {
    const { name } = e.target;
    if (name === "term") {
      setIsTermEdit(false);
    }
    // else if (name === "email") {
    //   setIsEditingEmail(false);
    // } else {
    //   setIsEditingGrade(false);
    // }

    updateMemberGroup(rsh);
  };

  return (
    <tr>
      <td
        className={
          grpDetail.leaderId === rsh.id
            ? `border-2 border-gray-300 bg-yellow-300 py-2  text-gray-800`
            : `border-2 border-gray-300 py-2  text-gray-800`
        }
      >
        {idx + 1}
      </td>
      <td className="border-2 border-gray-300 py-2  text-gray-800">
        {rsh.firstname}
      </td>
      <td className="border-2 border-gray-300 py-2  text-gray-800">
        {rsh.lastname}
      </td>
      <td className="border-2 border-gray-300 py-2  text-gray-800">
        {rsh.student_id}
      </td>
      <td className="border-2 border-gray-300 py-2  text-gray-800">
        {rsh.categorie_room.room}
      </td>
      <td className="border-2 border-gray-300 py-2  text-gray-800">
        {rsh.tel}
      </td>
      <td className="border-2 border-gray-300 py-2  text-gray-800">
        {rsh.grade}
      </td>
      <td className="border-2 border-gray-300 py-2  text-gray-800">
        {rsh.gradeProject}
      </td>
      <td
        className={`border-2 border-gray-300 py-2 text-gray-800 ${
          ctx.role === "admin" ? "cursor-pointer hover:bg-gray-400" : ""
        }`}
        onClick={() => editHandlerClick(grpId, rsh.id)}
      >
        {isTermEdit ? (
          <input
            className="input rounded-xl border-none bg-gray-300 text-center"
            type="text"
            name="term"
            id=""
            autoFocus
            value={rsh.term}
            onBlur={(e) => handleOnBlur(e)}
            onChange={(e) => handleChangeValue(e)}
          />
        ) : (
          <>{rsh.term}</>
        )}
      </td>
      {ctx.role === "admin" && (
        <>
          <td className="border-2 border-gray-300 py-2 text-center  text-white">
            {grpDetail.leaderId === rsh.id ? (
              <button
                className="rounded-lg bg-gray-400 px-5  py-1  shadow-lg disabled:cursor-not-allowed"
                onClick={() => deleteFromGroupHandler(rsh.id)}
                disabled
              >
                <RiVipCrown2Fill color="yellow" />
              </button>
            ) : (
              <button
                className="rounded-lg bg-green-400  px-5 py-1 shadow-lg hover:bg-green-600"
                onClick={() => changeLeaderClick(grpDetail.id, rsh.id)}
              >
                <RiVipCrown2Fill color="yellow" />
              </button>
            )}
          </td>
          <td className="border-2 border-gray-300 py-2 text-center  text-white">
            <button
              className="rounded-lg bg-red-600  px-5 py-1 shadow-lg hover:bg-red-500"
              onClick={() => deleteFromGroupHandler(rsh.id)}
            >
              ลบ
            </button>
          </td>
        </>
      )}
    </tr>
  );
};
export default Member;
