import React, { useState, useEffect, Fragment } from "react";
import dayjs from "dayjs";
const ResultLog = () => {
  const [log, setLog] = useState([]);

  useEffect(() => {
    const getLog = async () => {
      const result = await fetch("http://localhost:8080/result/log", {
        method: "GET",
        credentials: "include",
      });

      const data = await result.json();
      console.log(data);
      setLog(data);
    };

    getLog();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-6 content-center py-1 text-center">
        <div className="flex w-full items-center justify-center bg-light-blue-200 py-4">
          ลำดับ
        </div>
        <div className="flex w-full items-center justify-center bg-light-blue-200 py-4">
          ชื่อกลุ่ม
        </div>
        <div className="flex w-full items-center justify-center bg-light-blue-200 py-4">
          สถานะ
        </div>
        <div className="flex w-full items-center justify-center bg-light-blue-200 py-4">
          เวลา
        </div>
        <div className="flex w-full items-center justify-center bg-light-blue-200 py-4">
          บันทึกเมื่อ
        </div>
        <div className="flex w-full items-center justify-center bg-light-blue-200 py-4">
          ผลสอบ
        </div>
      </div>
      {log.length > 0 ? (
        log.map((result, index) => (
          <div
            key={index}
            className="grid grid-cols-6 content-center py-1 text-center"
          >
            <div className="flex w-full items-center justify-center bg-gray-200 py-4">
              {index + 1}
            </div>
            <div className="flex w-full items-center justify-center bg-gray-200 py-4">
              {result.title}
            </div>
            <div className="flex w-full items-center justify-center bg-gray-200 py-4">
              {result.categories}
            </div>
            <div className="flex w-full items-center justify-center bg-gray-200 py-4">
              {dayjs(result.start_time).format("DD/MM/YYYY HH:mm")} -{" "}
              {dayjs(result.end_time).format("HH:mm")}
            </div>
            <div className="flex w-full items-center justify-center bg-gray-200 py-4">
              {dayjs(result.createdAt).format("DD/MM/YYYY HH:mm")}
            </div>
            <div className="flex w-full items-center justify-center bg-gray-200 py-4">
              {result.status}
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

export default ResultLog;
