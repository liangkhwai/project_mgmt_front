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
    <div>
      <div className="grid grid-cols-6 content-center py-1 text-center">
        <div className="flex w-full items-center justify-center bg-gray-200 py-4">
          ลำดับ
        </div>
        <div className="flex w-full items-center justify-center bg-gray-200 py-4">
          ชื่อกลุ่ม
        </div>
        <div className="flex w-full items-center justify-center bg-gray-200 py-4">
          สถานะ
        </div>
        <div className="flex w-full items-center justify-center bg-gray-200 py-4">
          เวลา
        </div>
        <div className="flex w-full items-center justify-center bg-gray-200 py-4">
          ผ่าน
        </div>
        <div className="flex w-full items-center justify-center bg-gray-200 py-4">
          ไม่ผ่าน
        </div>
      </div>
      {resultLists.length > 0 ? (
        resultLists.map((result, index) => (
          <div
            key={result.id}
            className="grid grid-cols-6 content-center py-1 text-center"
          >
            <div className="flex w-full items-center justify-center bg-gray-200 py-4">
              {index + 1}
            </div>
            <div
              onClick={() => navigate(`/dashboard/group/${result.grpId}`)}
              className="flex w-full items-center justify-center bg-gray-200 py-4 text-light-blue-700 transition-all delay-75 hover:cursor-pointer hover:text-light-blue-300"
            >
              {result.title}
            </div>
            <div className="flex w-full items-center justify-center bg-gray-200 py-4">
              {result.status}
            </div>
            <div className="flex w-full items-center justify-center bg-gray-200 py-4">
              {dayjs(result.start_time).format("DD/MM/YYYY HH:mm")} -{" "}
              {dayjs(result.end_time).format("HH:mm")}
            </div>
            <div className="flex w-full items-center justify-center bg-gray-200 py-4">
              <button
                className="rounded-md bg-green-600 px-4 py-1 text-white hover:bg-green-400"
                onClick={() => submitResult(true, result)}
              >
                ผ่าน
              </button>
            </div>
            <div className="flex w-full items-center justify-center bg-gray-200 py-4">
              <button
                className="rounded-md bg-red-600 px-4 py-1 text-white hover:bg-red-400"
                onClick={() => submitResult(false, result)}
              >
                ไม่ผ่าน
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-6 flex w-full items-center justify-center bg-gray-200 py-4">
          ยังไม่มีรายการในขณะนี้
        </div>
      )}
    </div>
  );
};

export default ResultRow;
