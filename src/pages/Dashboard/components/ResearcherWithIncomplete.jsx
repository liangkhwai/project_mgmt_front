import React, { Fragment } from "react";

const ResearcherWithIncomplete = ({ dashboard }) => {
  console.log(dashboard);
  return (
    <div className="h-full rounded-xl border bg-white shadow-lg">
      <div className="mx-10 my-5 text-xl font-bold">รายชื่อผู้วิจัยติด I</div>
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
          {dashboard?.researcherWithInComplete?.length !== 0 ? (
            <>
              {dashboard.researcherWithInComplete && (
                <Fragment>
                  {dashboard.researcherWithInComplete.map(
                    (researcher, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{researcher.student_id}</td>
                        <td>{researcher.firstname}</td>
                        <td>{researcher.lastname}</td>
                        <td>{researcher.categorie_room.room}</td>
                      </tr>
                    ),
                  )}
                </Fragment>
              )}
            </>
          ) : (
            <tr>
              <td className=" py-2 text-center" colSpan={5}>
                ไม่มีรายชื่อผู้วิจัยที่ติด I
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResearcherWithIncomplete;
