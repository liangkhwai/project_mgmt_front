import React from "react";

const TeacherInfo = ({ countAdvisor }) => {
  console.log(countAdvisor);

  if (!countAdvisor) return <div>loading...</div>;

  return (
    <div className="h-full rounded-xl bg-white shadow-lg">
      <div className="m-3 text-start">คณะอาจารย์ที่กำลังดูแลกลุ่มโปรเจค</div>
      <div className="mx-5">
        <table className="table w-full text-center">
          <thead>
            <tr>
              <th>ชื่อ - นามสกุล</th>
              <th>เบอร์โทรศัพท์</th>
              <th>ที่ปรึกษา</th>
              <th>ประธานกรรมการสอบ</th>
              <th>กรรมการสอบ</th>
            </tr>
          </thead>
          <tbody>
            {countAdvisor?.countAdvisor?.map((item, idx) => (
              <tr key={idx}>
                <td>
                  อาจารย์ {item.firstname} {item.lastname}
                </td>
                <td>{item.tel}</td>
                <td>{item.advisor_count} กลุ่ม</td>
                <td>{item.board1_count} กลุ่ม</td>
                <td>{item.board2_count} กลุ่ม</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherInfo;
