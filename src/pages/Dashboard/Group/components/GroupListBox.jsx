import React, { useEffect } from "react";

const GroupListBox = () => {
    useEffect(()=>{

    },[])
  return (
    <div className="w-full border-2 border-black">
      ชื่อ
      <table className="table w-full ">
        <thead>
          <th>ลำดับ</th>
          <th>รหัสนักศึกษา</th>
          <th>ชื่อ - นามสกุล</th>
          <th>เบอร์โทร</th>
          <th>Email</th>
          <th>เกรดเฉลี่ย</th>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  );
};

export default GroupListBox;
