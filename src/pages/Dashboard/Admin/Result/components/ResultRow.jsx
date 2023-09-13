import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import dayjs from "dayjs";
const ResultRow = ({ result, idx, setResultLists }) => {
  const navigate = useNavigate();

  const submitResult = async (status) => {
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
      const response = await fetch("http://localhost:8080/result/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resultId: result.examRequestId,
          result: status,
          bookingId: result.id,
          grpId: result.grpId,
        }),
        credentials: "include",
      });
      if ((await response.status) === 200) {
        const data = await response.json();
        console.log(data);
        setResultLists((prev) => prev.filter((item) => item.id !== result.id));
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
    });
  };

  return (
    <tr key={result.id}>
      <td>{idx + 1}</td>
      <td
        onClick={() => navigate(`/dashboard/group/${result.grpId}`)}
        className="hover:cursor-pointer text-light-blue-700 hover:text-light-blue-300 delay-75 transition-all  "
      >
        {result.title}
      </td>
      <td>{result.status}</td>
      <td>
        วันที่ {dayjs(result.start_time).locale("th").format("d")} เวลา{" "}
        {dayjs(result.start_time).format("HH:mm")} -{" "}
        {dayjs(result.end_time).format("HH:mm")}
      </td>
      <td>
        <button
          className="px-4 py-1 bg-green-600 rounded-md text-white hover:bg-green-400"
          onClick={() => submitResult(true)}
        >
          ผ่าน
        </button>
      </td>
      <td>
        <button
          className="px-4 py-1 bg-red-600 rounded-md text-white hover:bg-red-400"
          onClick={() => submitResult(false)}
        >
          ไม่ผ่าน
        </button>
      </td>
    </tr>
  );
};

export default ResultRow;
