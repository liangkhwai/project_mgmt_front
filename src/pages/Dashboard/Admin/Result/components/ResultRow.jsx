import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import dayjs from "dayjs";
const ResultRow = () => {
  const [resultLists, setResultLists] = useState([]);

  useEffect(() => {
    const getResultList = async () => {
      const result = await fetch("http://localhost:8080/result/list", {
        method: "GET",
        credentials: "include",
      });

      const data = await result.json();
      console.log(data);
      setResultLists(data);
    };

    getResultList();
  }, []);
  console.log("show");
  const navigate = useNavigate();

  const submitResult = async (status, result) => {
    Swal.fire({
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      showCancelButton: true,
      title: `คุณต้องการบันทึกผลการสอบ ?`,
      text: `คุณต้องการบันทึกผลสอบให้  ${status ? "ผ่าน" : "ไม่ผ่าน"} หรือไม่`,
      icon: "warning",
    }).then(async (res) => {
      if (res.isConfirmed) {
        const response = await fetch("http://localhost:8080/result/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resultId: result.examRequestId,
            result: status,
            bookingId: result.id,
            grpId: result.grpId,
            groupStatus: result.status,
          }),
          credentials: "include",
        });
        if ((await response.status) === 200) {
          const data = await response.json();
          console.log(data);
          setResultLists((prev) =>
            prev.filter((item) => item.id !== result.id),
          );
          Swal.fire({
            icon: "success",
            title: "บันทึกผลสำเร็จ",
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "บันทึกผลไม่สำเร็จ",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      } else {
        return;
      }
    });
  };

  return (
    <table className="table w-full text-center">
      <thead>
        <tr>
          <th>ลำดับ</th>
          <th>ชื่อกลุ่ม</th>
          <th>สถานะ</th>
          {/* <th>ขอสอบ</th> */}
          <th>เวลา</th>
          <th>ผ่าน</th>
          <th>ไม่ผ่าน</th>
        </tr>
      </thead>
      <tbody>
        {resultLists.length > 0 ? (
          resultLists.map((result, index) => (
            <tr key={result.id}>
              <td>{index + 1}</td>
              <td
                onClick={() => navigate(`/dashboard/group/${result.grpId}`)}
                className="text-light-blue-700 transition-all delay-75 hover:cursor-pointer hover:text-light-blue-300  "
              >
                {result.title}
              </td>
              <td>{result.status}</td>
              {/* <td>{resultTarget}</td> */}
              <td>
                วันที่ {dayjs(result.start_time).locale("th").format("D")} เวลา{" "}
                {dayjs(result.start_time).format("HH:mm")} -{" "}
                {dayjs(result.end_time).format("HH:mm")}
              </td>
              <td>
                <button
                  className="rounded-md bg-green-600 px-4 py-1 text-white hover:bg-green-400"
                  onClick={() => submitResult(true, result)}
                >
                  ผ่าน
                </button>
              </td>
              <td>
                <button
                  className="rounded-md bg-red-600 px-4 py-1 text-white hover:bg-red-400"
                  onClick={() => submitResult(false, result)}
                >
                  ไม่ผ่าน
                </button>
              </td>
            </tr>
          ))
        ) : (
          <Fragment>
            <tr className="text-center">
              <td colSpan="6" className="py-5 text-xl font-bold ">
                ยังไม่มีรายการในขณะนี้
              </td>
            </tr>
          </Fragment>
        )}
      </tbody>
    </table>
  );
};

export default ResultRow;
