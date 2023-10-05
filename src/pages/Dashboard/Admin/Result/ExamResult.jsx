import React, { useEffect, useState, Fragment } from "react";
import Body from "../../../../UI/Body";
import Title from "../../../../UI/Title";
import ResultRow from "./components/ResultRow";
import ResultLog from "./components/ResultLog";

export const FilterLog = ({ selectMenu, setSelectMenu }) => {
  return (
    <div className="flex justify-start mb-5">
      <div className="flex flex-row gap-3">
        <div
          onClick={() => setSelectMenu("result")}
          className={`${
            selectMenu === "result" ? "bg-blue-500" : "bg-blue-300"
          } cursor-pointer rounded-lg px-3 py-1 text-white`}
        >
          รายการสอบ
        </div>
        <div
          onClick={() => setSelectMenu("log")}
          className={`${
            selectMenu === "log" ? "bg-blue-500" : "bg-blue-300"
          } cursor-pointer rounded-lg px-3 py-1 text-white`}
        >
          ประวัติการสอบ
        </div>
      </div>
    </div>
  );
};

const ExamResult = () => {
  const [selectMenu, setSelectMenu] = useState("result");

  return (
    <div className="mx-10">
      <Title>บันทึกผลการสอบ</Title>
      <Body>
        <FilterLog selectMenu={selectMenu} setSelectMenu={setSelectMenu} />
        {selectMenu === "result" ? <ResultRow /> : <ResultLog />}
      </Body>
    </div>
  );
};

export default ExamResult;
