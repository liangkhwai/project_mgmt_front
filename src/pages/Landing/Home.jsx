import React from "react";
import univer1 from "../../assets/univer1.png";
import univer0 from "../../assets/univer0.png";
import univer4 from "../../assets/univer4.png";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Home = () => {
  return (
    <div className=" bg-blue-50">
      <div className="">
        <Carousel
          autoPlay={true}
          showThumbs={false}
          showStatus={false}
          interval={4000}
          transitionTime={600}
          infiniteLoop={true}
          showArrows={false}
          dynamicHeight={true}
          stopOnHover={true}
          
        >
          <div className="">
            <div className="relative ">
              <img
                className="h-full"
                src={univer1}
                alt="dsadsa"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="absolute bottom-0 right-0 text-5xl mb-20 mr-8 text-white  uppercase font-normal">
              rmuti kkc
            </div>
            <div className="absolute bottom-0 right-0 text-5xl mb-9 mr-8 text-white font-normal ">
              Digital Business Technology
            </div>
          </div>
          <div className="">
            <div className="relative ">
              <img
                className="h-full"
                src={univer0}
                alt="dsadsa"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="absolute bottom-0 right-0 text-5xl mb-20 mr-8 text-white  uppercase font-normal">
              rmuti kkc
            </div>
            <div className="absolute bottom-0 right-0 text-5xl mb-9 mr-8 text-white font-normal ">
              Digital Business Technology
            </div>
          </div>
          {/* <div className="">
            <div className="relative border border-black  h-full ">
              <img
                className="h-"
                src={univer4}
                alt="dsadsa"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="absolute bottom-0 right-0 text-5xl mb-20 mr-8 text-white  uppercase font-normal">
              rmuti kkc
            </div>
            <div className="absolute bottom-0 right-0 text-5xl mb-9 mr-8 text-white font-normal ">
              Digital Business Technology
            </div>
          </div> */}
        </Carousel>
      </div>

      <div className=" w-full h-56 bg-blue-50 ">
        <div className="text-xs ml-40 mt-10 ">ข้อมูล............</div>
        <div className="text-2xl font-medium ml-40 ">สถิติเจ้าของผลงาน</div>

        <div className=" text-center  w-auto flex mt-10">
          <div className="text-sky-500 text-4xl font-medium flex-1 ">1,049</div>
          <div className="text-sky-500 text-4xl font-medium flex-1  ">689</div>
          <div className="text-sky-500 text-4xl font-medium flex-1 ">79</div>
        </div>
        <div className="text-center w-auto flex mt-2 ">
          <div className="w-80  text-sm font-medium  flex-1">
            จำนวนผลงานวิจัย
          </div>
          <div className="w-80  text-sm font-medium  flex-1">
            จำนวนผู้วิจัยที่สำเร็จการศึกษา
          </div>
          <div className="w-80  text-sm font-medium  flex-1">
            จำนวนผู้วิจัยที่กำลังศึกษาอยู่
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
