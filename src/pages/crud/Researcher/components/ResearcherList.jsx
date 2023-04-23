import React from "react";

const ResearcherList = ({ list }) => {
  return list.map((rsh, idx) => (
    <tr key={rsh.id} className="text-center">
      <td>{rsh.student_id}</td>
      <td>{rsh.firstname}</td>
      <td>{rsh.lastname}</td>
      <td>{rsh.email}</td>
      <td>{rsh.tel}</td>
      <td>{rsh.grade}</td>
      <td><button className="px-3 py-2 rounded bg-yellow-400 text-black">แก้ไข</button></td>
      <td><button className="px-3 py-2 rounded bg-red-500 text-black">ลบ</button></td>
    </tr>
  ));
};

export default ResearcherList;
