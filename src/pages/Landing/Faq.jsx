import React from "react";

const Faq = () => {
  return (
    <div className="bg-blue-50 flex flex-col justify-normal h-screen">
      <div className="mx-44">
        <div className="text-4xl my-10 text-blue-800 font-semibold">
          คำถามที่พบบ่อย
        </div>
        <div className="bg-white p-10 mb-20 border rounded-xl  ">
          <div className="bg-blue-50 rounded-xl grid divide-y divide-neutral-200 ">
            <div className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none pl-5 ">
                  <div className="text-2xl">
                    {" "}
                    เว็บไซต์นี้สร้างขึ้นมาเพื่ออะไร
                  </div>

                  <div className="transition group-open:rotate-180 pr-5 ">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="200"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </div>
                </summary>
                <p className="indent-10 mt-3 group-open:animate-fadeIn pl-5 pr-8 mr-20">
                  {" "}
                  เพื่อให้นักศึกษาชั้นปีที่ 4
                  ของมหาวิทยาลัยเทคโนโลยีราชมงคลอีสานวิทยาเขตขอนแก่น
                  คณะบริหารธุรกิจและสารสนเทศสาขาเทคโนโลยีธุรกิจดิจิทัล
                  เล็งเห็นความสำคัญของ การค้นหาข้อมูล การสืบค้นข้อมูล การจัดเก็บ
                  จึงได้จัดทำระบบพัฒนาจัดการข้อมูลโครงงานทางเทคโนโลยีธุรกิจดิจิทัล
                  เพื่อให้เกิดการแก้ไข
                  โดยการพัฒนาระบบเว็บแอปพลิเคชันเพื่อให้อาจารย์และนักศึกษาสามารถเข้าถึงข้อมูลของเอกสารวิทยานิพนธ์ในรายวิชาปัญหาพิเศษทางเทคโนโลยีธุรกิจดิจิทัลและแบบฟอร์มต่างๆที่เกี่ยวข้องในการทำโปรเจค
                  ทดแทนการใช้เอกสาร
                  ที่เปลี่ยนมาเป็นในรูปแบบเอกสารอิเล็กทรอนิกส์เพื่อความสะดวกรวดเร็วในการสืบค้นข้อมูลและจัดเก็บข้อมูล
                  โดยรวมไปถึงอาจารย์สามารถกำหนดเวลาที่สะดวกและดูรายงานความก้าวหน้าของโปรเจคผู้วิจัยแต่ละกลุ่ม
                  และผู้วิจัยสามารถทราบถึงระยะเวลาที่แน่นอนของอาจารย์ที่ปรึกษาผ่านทางเว็บไซต์
                  ตลอดจนมีการแจ้งเตือนผ่านทางระบบแอปพลิเคชันไลน์ให้อาจารย์และนักศึกษาสามารถรับรู้การเคลื่อนไหวอย่างทันท่วงทีเพื่อให้ได้ระบบที่มีประสิทธิภาพ
                </p>
              </details>
            </div>
            <div className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none pl-5 ">
                  <div className="text-2xl">
                    {" "}
                    มีปริญญานิพนธ์ที่สมบูรณ์ทั้งหมดกี่ฉบับ
                  </div>
                  <div className="transition group-open:rotate-180 pr-5 ">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="200"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </div>
                </summary>
                <p className="indent-5 mt-5 group-open:animate-fadeIn pl-5 pr-8 mr-20">
                  1,000 ฉบับ
                </p>
              </details>
            </div>
            <div className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none pl-5 ">
                  <div className="text-2xl"> นักศึกษาจบไปแล้วกี่คน</div>
                  <div className="transition group-open:rotate-180 pr-5 ">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="200"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </div>
                </summary>
                <p className="indent-10 mt-3 group-open:animate-fadeIn pr-8 mr-20">
                  1,400 คน
                </p>
              </details>
            </div>
            <div className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none pl-5 ">
                  <div className="text-2xl"> มีอาจารย์ทั้งหมดกี่คน</div>
                  <div className="transition group-open:rotate-180 pr-5 ">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="200"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </div>
                </summary>
                <p className="indent-5 mt-3 group-open:animate-fadeIn pl-5 pr-8 mr-20">
                  7 คน
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
