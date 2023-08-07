import React, { Fragment, useState } from "react";
import { useMutation } from "react-query";

const ResearcherRow = ({ rsh, idx, setIsEditing, setGroupList }) => {
  const [isEditingTel, setIsEditingTel] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingGrade, setIsEditingGrade] = useState(false);

  const updateMemberGroup = useMutation({
    mutationFn: async (rsh) => {
      const res = await fetch(`http://localhost:8080/researcher/update`, {
        method: "put",
        body: JSON.stringify({ ...rsh }),
        headers: { "Content-Type": "application/json" },
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
      <td>{idx + 1}</td>
      <td onClick={() => console.log(rsh)}>{rsh.student_id}</td>
      <td>
        {rsh.firstname} {rsh.lastname}
      </td>
      <td onClick={() => setIsEditingTel(true)}>
        {isEditingTel ? (
          <input
            type="text"
            name="tel"
            id=""
            autoFocus
            onChange={(e) => handleChangeValue(e)}
            onBlur={(e) => handleOnBlur(e)}
            value={rsh.tel ? rsh.tel : ""}
          />
        ) : (
          <Fragment> {rsh.tel}</Fragment>
        )}
      </td>
      <td onClick={() => setIsEditingEmail(true)}>
        {isEditingEmail ? (
          <input
            type="text"
            name="email"
            id=""
            autoFocus
            onChange={(e) => handleChangeValue(e)}
            onBlur={(e) => handleOnBlur(e)}
            value={rsh.email ? rsh.email : ""}
          />
        ) : (
          <Fragment> {rsh.email}</Fragment>
        )}
      </td>
      <td onClick={() => setIsEditingGrade(true)}>
        {isEditingGrade ? (
          <input
            type="text"
            name="grade"
            id=""
            autoFocus
            onChange={(e) => handleChangeValue(e)}
            onBlur={(e) => handleOnBlur(e)}
            value={rsh.grade ? rsh.grade : ""}
          />
        ) : (
          <Fragment> {rsh.grade}</Fragment>
        )}
      </td>
    </tr>
  );
};

export default ResearcherRow;
