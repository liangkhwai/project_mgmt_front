import React from "react";
import univer3 from "../../assets/univer3.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-screen h-screen bg-blue-50">
           <img          
            src={univer3}
            alt="univer"
            style={{ width: "100%", height: "auto" }}

          />
    <div className=" w-screen h-screen bg-blue-50 ">
      <div className=" text-xs ml-40 mt-10 ">ข้อมูล.....</div>
      <div className="text-lg font-medium ml-40 ">สถิติเจ้าของผลงาน</div>
     

      <div className=" text-sky-500  grid grid-cols-3 gap-96 mt-10 ml-60 mr-60  ">
        <div className="text-4xl font-medium   ">1,205</div>
        <div className="text-4xl font-medium   ">2,205</div>
        <div className="text-4xl font-medium   ">205</div>
      </div>
      <div className="  text-black text-justify grid grid-cols-3 gap-96  ml-56 mr-60  ">
        <div className="text-sm font-medium   ">จำนวนผลงานวิจัย</div>
        <div className="text-sm font-medium   ">จำนวนผลงานวิจัย</div>
        <div className="text-sm font-medium   ">จำนวนผลงานวิจัย</div>
      </div>
    </div>
    </div>
  );
};

export default Home;
