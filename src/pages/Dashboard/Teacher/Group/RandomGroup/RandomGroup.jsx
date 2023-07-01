import React from "react";
import Title from "../../../../../UI/Title";
import Body from "../../../../../UI/Body";
import FormRandom from "./components/FormRandom";
import ResultRandom from "./components/ResultRandom";

const RandomGroup = () => {
  return (
    <div className="mx-10">
      <Title>สุ่มกรรมการสอบ</Title>
      <Body>
        <div className="grid grid-cols-2 gap-2">
          <div className="border rounded-md text-center border-black">
            <FormRandom />
          </div>
          <div className="border rounded-md text-center border-black">
            <ResultRandom />
          </div>
        </div>
      </Body>
    </div>
  );
};

export default RandomGroup;
