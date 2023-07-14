import React from "react";
import Title from "../../../../../UI/Title";
import Body from "../../../../../UI/Body";
import FormRandom from "./components/FormRandom";
import ResultRandom from "./components/ResultRandom";

const RandomGroup = () => {

  const groupDemo = [
    {
      id:2,
      title:"กลุ่มที่ 1"
    },
    {
      id:2,
      title:"กลุ่มที่ 2"
    },
    {
      id:3,
      title:"กลุ่มที่ 3"
    },
    {
      id:4,
      title:"กลุ่มที่ 4"
    },
    {
      id:5,
      title:"กลุ่มที่ 5"
    },
    {
      id:6,
      title:"กลุ่มที่ 6"
    },
    {
      id:7,
      title:"กลุ่มที่ 7"
    },
    {
      id:8,
      title:"กลุ่มที่ 8"
    },
    {
      id:9,
      title:"กลุ่มที่ 9"
    },
    {
      id:10,
      title:"กลุ่มที่ 10"
    },
    {
      id:11,
      title:"กลุ่มที่ 11"
    },
  ]



   
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
