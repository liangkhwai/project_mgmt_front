import React from "react";

const TeacherInfo = ({ countAdvisor }) => {
  console.log(countAdvisor);

  if (!countAdvisor) return <div>loading...</div>;

  return (
    <div className="border rounded-xl bg-white shadow-lg w-full h-full">
      <div className="text-start m-3">คณะอาจารย์ที่กำลังดูแลกลุ่มโปรเจค</div>
      <div className="mx-5">
        <table className="table w-full m-5 text-center">
          <thead>
            <tr>
              <th>ชื่อ - นามสกุล</th>
              <th>เบอร์โทรศัพท์</th>
              <th>ที่ปรึกษา</th>
            </tr>
          </thead>
          <tbody>
            {countAdvisor?.countAdvisor?.map((item, idx) => (
              <tr key={idx}>
                <td>
                  {item.firstname} {item.lastname}
                </td>
                <td>{item.tel}</td>
                <td>{item.advisor_count} กลุ่ม</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherInfo;
