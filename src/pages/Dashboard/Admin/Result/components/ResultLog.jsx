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
      <table className="table w-full text-center">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>ชื่อกลุ่ม</th>
            <th>สถานะ</th>
            {/* <th>ขอสอบ</th> */}
            <th>เวลา</th>
            <th>บันทึกเมื่อ</th>
            <th>ผลสอบ</th>
          </tr>
        </thead>
        <tbody>
          {log.length > 0 ? (
            log.map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{result.title}</td>
                <td>{result.categories}</td>
                <td>
                  วันที่ {dayjs(result.start_time).locale("th").format("D")}{" "}
                  เวลา {dayjs(result.start_time).format("HH:mm")} -{" "}
                  {dayjs(result.end_time).format("HH:mm")}
                </td>
                <td>
                  วันที่ {dayjs(result.createdAt).locale("th").format("D")} เวลา{" "}
                  {dayjs(result.createdAt).format("HH:mm")}
                </td>
                <td>{result.status}</td>
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
    </div>
  );
};

export default ResultLog;
