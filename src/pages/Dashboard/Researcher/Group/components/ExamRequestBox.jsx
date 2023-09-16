import React from "react";

const ExamRequestBox = ({ requestExam }) => {
  return (
    <div className="p-5">
      <table className="table w-full">
        <thead>
          <tr>
            <th>ประเภทการขอสอบ</th>
            <th>สถานะการขอสอบ</th>
            {/* <th>วันที่จองเวลาสอบ</th>
            <th>สถานะผลการสอบ</th>
            <th>ข้อเสนอแนะ</th> */}
          </tr>
        </thead>
        <tbody>
          {requestExam.length > 0 ? (
            requestExam.map((item, idx) => (
              <tr key={item.id}>
                <td className="text-center">{item.categories}</td>
                <td className="text-center">{item.status}</td>
                {/* <td className="text-center">-</td>
                <td className="text-center">
                  {item.isApprove === 0
                    ? "ไม่ผ่าน"
                    : item.isApprove === 1
                    ? "ผ่าน"
                    : "-"}
                </td>
                <td className="text-center">-</td> */}
              </tr>
            ))
          ) : (
            <tr className="">
              <td colSpan="5" style={{ textAlign: "center" }} className="py-5">
                <h3 className="text-xl">ยังไม่ยื่นคำขอ </h3>
              </td>
            </tr>
          )}

          {/* {requestExam.map((item, idx) => (
            <tr key={item.id}>
              <td className="text-center">{item.categories}</td>
              <td className="text-center">{item.status}</td>
              <td className="text-center">-</td>
              <td className="text-center">
                {item.isApprove === 0
                  ? "ไม่ผ่าน"
                  : item.isApprove === 1
                  ? "ผ่าน"
                  : "-"}
              </td>
              <td className="text-center">-</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default ExamRequestBox;
