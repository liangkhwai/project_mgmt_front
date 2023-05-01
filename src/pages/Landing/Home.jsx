import React from "react";
import univer3 from "../../assets/univer2.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" bg-blue-50">
           <img          
            src={univer3}
            alt="dsadsa"
            style={{ width: "100%", height: "auto" }}

          />
    <div className=" w-full h-screen bg-blue-50 ">
      <div className="text-xs ml-40 mt-10 ">ข้อมูล............</div>
      <div className="text-2xl font-medium ml-40 ">สถิติเจ้าของผลงาน</div>
     

      <div className=" text-center  w-auto flex mt-10">
        <div className="text-sky-500 text-4xl font-medium flex-1 ">1,049</div>
        <div className="text-sky-500 text-4xl font-medium flex-1  ">689</div>
        <div className="text-sky-500 text-4xl font-medium flex-1 ">79</div>
      </div>
      <div className="text-center w-auto flex mt-2 ">
        <div className="w-80  text-sm font-medium  flex-1">จำนวนผลงานวิจัย</div>
        <div className="w-80  text-sm font-medium  flex-1">จำนวนผู้วิจัยที่สำเร็จการศึกษา</div>
        <div className="w-80  text-sm font-medium  flex-1">จำนวนผู้วิจัยที่กำลังศึกษาอยู่</div>
      </div>
    </div>
    </div>
  );
};

export default Home;
