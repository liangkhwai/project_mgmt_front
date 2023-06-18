import React from "react";

const GroupList = ({ groupList }) => {
  return (
    <div className="w-full border-2 border-black">
      ชื่อ
      <table className="table w-full text-center">
        <thead>
          <th>ลำดับ</th>
          <th>รหัสนักศึกษา</th>
          <th>ชื่อ - นามสกุล</th>
          <th>เบอร์โทร</th>
          <th>Email</th>
          <th>เกรดเฉลี่ย</th>
        </thead>
        <tbody>
          {groupList.map((item, idx) => {
            return (
              <tr>
                <td>{idx + 1}</td>
                <td>{item.student_id}</td>
                <td>
                  {item.firstname} {item.lastname}
                </td>
                <td>{item.tel}</td>
                <td>{item.email}</td>
                <td>{item.grade}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GroupList;
