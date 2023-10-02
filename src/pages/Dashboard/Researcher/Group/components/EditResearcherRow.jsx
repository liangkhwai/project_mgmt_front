import React from "react";

const EditResearcherRow = ({ rsh, idx, setIsEditing }) => {
  return (
    <tr key={rsh.id}>
      <td>{idx + 1}</td>
      <td>{rsh.student_id}</td>
      <td>
        {rsh.firstname} {rsh.lastname}
      </td>
      <td>
        <input type="text" name="" id="" onBlur={() => setIsEditing(false)} />
      </td>
      <td>
        <input type="text" name="" id="" onBlur={() => setIsEditing(false)} />
      </td>
      <td>
        <input type="text" name="" id="" onBlur={() => setIsEditing(false)} />
      </td>
      {/* <td>{rsh.tel}</td>
                  <td>{rsh.email}</td>
                  <td>{rsh.grade}</td> */}
    </tr>
  );
};

export default EditResearcherRow;
