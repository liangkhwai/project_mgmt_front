import React, { Fragment } from "react";

const ResearcherWithNotRegister = ({ dashboard }) => {
  console.log(dashboard);
  return (
    <div className="h-full rounded-xl bg-white shadow-lg border">
      <div className="mx-10 my-5 text-xl font-bold">
        รายชื่อผู้วิจัยที่ยังไม่ลงรายวิชานี้
      </div>

      <table className="table w-full text-center">
        <thead>
          <tr style={{ backgroundColor: "#F1F5F9" }}>
            <th>ลำดับ</th>
            <th>รหัสนักศึกษา</th>
            <th>ชื่อ</th>
            <th>นามสกุล</th>
            <th>ห้อง</th>
          </tr>
        </thead>
        <tbody>
          {dashboard.researcherWithNotRegistger && (
            <Fragment>
              {dashboard.researcherWithNotRegistger.map((researcher, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{researcher.student_id}</td>
                  <td>{researcher.firstname}</td>
                  <td>{researcher.lastname}</td>
                  <td>{researcher.categorie_room.room}</td>
                </tr>
              ))}
            </Fragment>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResearcherWithNotRegister;
