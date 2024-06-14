import React, { Fragment, useState } from "react";
import { useMutation } from "react-query";

const ResearcherRow = ({ rsh, idx, setIsEditing, setGroupList, group }) => {
  const [isEditingTel, setIsEditingTel] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingGrade, setIsEditingGrade] = useState(false);

  const updateMemberGroup = useMutation({
    mutationFn: async (rsh) => {
      const res = await fetch(`http://127.0.0.1:8080/researcher/update`, {
        method: "put",
        body: JSON.stringify({ ...rsh }),
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
         },
      });

      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setGroupList((prevData) => {
      const updatedData = prevData.map((item) => {
        if (item.id === rsh.id) {
          return { ...item, [name]: value };
        }
        return item;
      });
      return updatedData;
    });
  };

  const handleOnBlur = (e) => {
    const { name } = e.target;
    if (name === "tel") {
      setIsEditingTel(false);
    } else if (name === "email") {
      setIsEditingEmail(false);
    } else {
      setIsEditingGrade(false);
    }

    updateMemberGroup.mutate(rsh);
  };
  return (
    <tr key={rsh.id}>
      <td className={group?.leaderId === rsh.id ? `bg-yellow-300` : ``}>
        {idx + 1}
      </td>
      <td onClick={() => console.log(rsh)}>{rsh.student_id}</td>
      <td>
        {rsh.firstname} {rsh.lastname}
      </td>
      <td
        onClick={() => setIsEditingTel(true)}
        className="border bg-light-blue-100 hover:bg-light-blue-200"
      >
        {isEditingTel ? (
          <input
            type="text"
            name="tel"
            id=""
            className=""
            autoFocus
            onChange={(e) => handleChangeValue(e)}
            onBlur={(e) => handleOnBlur(e)}
            value={rsh.tel ? rsh.tel : ""}
          />
        ) : (
          <Fragment>
            {" "}
            <div className="">{rsh.tel}</div>
          </Fragment>
        )}
      </td>
      <td
        onClick={() => setIsEditingEmail(true)}
        className="border bg-light-blue-100 hover:bg-light-blue-200"
      >
        {isEditingEmail ? (
          <input
            type="text"
            name="email"
            id=""
            className=""
            autoFocus
            onChange={(e) => handleChangeValue(e)}
            onBlur={(e) => handleOnBlur(e)}
            value={rsh.email ? rsh.email : ""}
          />
        ) : (
          <Fragment>
            {" "}
            <div className="">{rsh.email}</div>
          </Fragment>
        )}
      </td>
      <td
        onClick={() => setIsEditingGrade(true)}
        className="border bg-light-blue-100 hover:bg-light-blue-200"
      >
        {isEditingGrade ? (
          <input
            type="text"
            name="grade"
            id=""
            className=""
            autoFocus
            onChange={(e) => handleChangeValue(e)}
            onBlur={(e) => handleOnBlur(e)}
            value={rsh.grade ? rsh.grade : ""}
          />
        ) : (
          <Fragment>
            {" "}
            <div className="">{rsh.grade}</div>
          </Fragment>
        )}
      </td>
    </tr>
  );
};

export default ResearcherRow;
