import React, { useEffect, useState } from "react";
import univer1 from "../../assets/univer1.png";
import univer5 from "../../assets/univer0.png";
import univer0 from "../../assets/univer0.png";
import univer6 from "../../assets/univer6.png";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.png";
const Home = () => {
  const [dashboard, setDashboard] = useState([]);
  useEffect(() => {
    const getDashboard = async () => {
      const res = await fetch("http://34.124.162.203:8080/dashboard/list");
      const data = await res.json();
      setDashboard(data);
    };
    getDashboard();
  }, []);
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
          <div className="relative h-52 w-full">
            <div className="relative ">
              <img
                className="relative object-cover"
                src={img1}
                alt="dsadsa"
                style={{ width: "100%", height: "800px" }}
              />
            </div>
            {/* <div className="absolute bottom-0 right-0 mb-20 mr-8 text-5xl font-normal  uppercase text-white">
              rmuti kkc
            </div>
            <div className="absolute bottom-0 right-0 mb-9 mr-8 text-5xl font-normal text-white ">
              Digital Business Technology
            </div> */}
          </div>
          <div className="h-52 w-full">
            <div className="relative ">
              <img
                className=" object-cover"
                src={img2}
                alt="dsadsa"
                style={{ width: "100%", height: "800px" }}
              />
            </div>
            {/* <div className="absolute bottom-0 right-0 mb-20 mr-8 text-5xl font-normal  uppercase text-white">
              rmuti kkc
            </div>
            <div className="absolute bottom-0 right-0 mb-9 mr-8 text-5xl font-normal text-white ">
              Digital Business Technology
            </div> */}
          </div>
        </Carousel>
      </div>

      <div className=" h-56 w-full bg-blue-50 ">
        <div className="ml-40 mt-10 flex flex-row divide-y-2 divide-blue-300 text-xs font-normal ">
          ข้อมูล
          {/* <div className="text-blue-900 ml-2"> ―――― </div> */}
        </div>
        <div className="ml-40 text-2xl font-medium ">สถิติเจ้าของผลงาน</div>

        <div className=" mt-10  flex w-auto text-center">
          <div className="text-sky-500 flex-1 text-4xl font-medium ">
            {dashboard?.countThesis}
          </div>
          <div className="text-sky-500 flex-1 text-4xl font-medium  ">
            {dashboard?.countResearcherWithStatusInGroup}
          </div>
          <div className="text-sky-500 flex-1 text-4xl font-medium ">
            {dashboard?.countResearcher}
          </div>
        </div>
        <div className="mt-2 flex w-auto text-center ">
          <div className="w-80  flex-1 text-sm  font-medium">
            จำนวนผลงานวิจัย
          </div>
          <div className="w-80  flex-1 text-sm  font-medium">
            จำนวนผู้วิจัยที่สำเร็จการศึกษา
          </div>
          <div className="w-80  flex-1 text-sm  font-medium">
            จำนวนผู้วิจัยที่กำลังศึกษาอยู่
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
