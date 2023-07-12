import React from "react";

const Morefaq = () => {
  return (
    <div className="bg-blue-50 flex flex-col justify-normal h-screen">
      <div className="mx-44">
        <div className="text-4xl my-10 text-blue-800 font-semibold">
          คำถามที่พบบ่อย
        </div>
        <div className="bg-white p-10 mb-20 border rounded-xl  ">
          <div className="bg-blue-50 rounded-xl  ">
            <ul class="mx-auto  shadow shadow-blue-600 rounded-xl">
              <li>
                <details class="group">
                  <summary class="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                    <svg
                      class="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      ></path>
                    </svg>
                    <span class="text-lg">เว็บไซต์นี้สร้างขึ้นมาเพื่ออะไร</span>
                  </summary>

                  <article class="px-4 pb-4 indent-10 ">
                    <p>
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
                  </article>
                </details>
              </li>
              <li>
                <details class="group">
                  <summary class="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                    <svg
                      class="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      ></path>
                    </svg>
                    <span class="text-lg">มีปริญญานิพนธ์ที่สมบูรณ์ทั้งหมดกี่ฉบับ</span>
                  </summary>

                  <article class="px-4 pb-4 indent-10 ">
                    <p>
                    1,000 ฉบับ{" "}
                    </p>
                  </article>
                </details>
              </li>
              <li>
                <details class="group">
                  <summary class="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                    <svg
                      class="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      ></path>
                    </svg>
                    <span class="text-lg">นักศึกษาจบไปแล้วกี่คน</span>
                  </summary>

                  <article class="px-4 pb-4 indent-10">
                    <p>
                    1,400 คน{" "}
                    </p>
                  </article>
                </details>
              </li>
              <li>
                <details class="group">
                  <summary class="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                    <svg
                      class="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      ></path>
                    </svg>
                    <span class="text-lg">มีอาจารย์ทั้งหมดกี่คน</span>
                  </summary>

                  <article class="px-4 pb-4 indent-10">
                    <p>
                    7 คน{" "}
                    </p>
                  </article>
                </details>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Morefaq;
