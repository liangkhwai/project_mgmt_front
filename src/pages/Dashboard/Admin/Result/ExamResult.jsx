import React, { useEffect, useState, Fragment } from "react";
import Body from "../../../../UI/Body";
import Title from "../../../../UI/Title";
import ResultRow from "./components/ResultRow";

const ExamResult = () => {
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

  return (
    <div className="mx-10">
      <Title>บันทึกผลการสอบ</Title>
      <Body>
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
                <ResultRow
                  key={index}
                  index={index}
                  result={result}
                  setResultLists={setResultLists}
                />
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
      </Body>
    </div>
  );
};

export default ExamResult;
