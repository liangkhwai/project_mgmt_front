import React, { useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
// import list from "./pages/Landing/list.json";

const Thesis = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-screen border bg-blue-50 ">
      <div className="mx-48 ">
        {/* กล่องที่2 */}
        <div className="h-auto flex flex-col justify-center rounded-2xl bg-white border mb-10 shadow-md mt-10">
          <div className="flex ml-10 ">
            <div className="relative  items-center rounded-lg "></div>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className=" bg-white  p-1 w-80 mt-10  text-blue-800 flex items-center justify-between font-medium text-sm rounded-l-lg tracking-wider border-2 border-blue-800   active:text-blue-300 "
            >
              รายละเอียดทั้งหมด
              {!isOpen ? (
                <AiOutlineCaretDown className="h-8 mr-5" />
              ) : (
                <AiOutlineCaretUp className="h-8 mr-5" />
              )}
            </button>
            {/* {isOpen && (
              <div className="bg-teal-400 absolute top-20 flex-col items-start rounded-lg p-2 w-full">
                {list.map((item, i) => (
                  <div className="flex w-full justify-between hover:bg-deep-orange-400 cursor-pointer rounded-r-lg border-l-transparent" key={i}>
                    <h3>{item.city}</h3>
                    <h3>{item.emotion}</h3>
                  </div>
                ))}
              </div>
            )} */}

            <div className="relative w-[900px] mt-10 mr-10">
              <input
                type="seach"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-black bg-white rounded-r-lg border-l-blue-800  border-l-1 border border-blue-800  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-blue-800  border-2 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-800"
                placeholder="ค้นหาปริญญานิพนธ์...."
                required
              />
            </div>
          </div>
          <div className="mt-10 ml-10 flex">
            <div className="text-blue-800 font-medium text-sm flex-1">
              ปีเริ่มต้น
            </div>
            <div className="text-blue-800 font-medium text-sm flex-1">
              ปีสิ้นสุด
            </div>
            <div className=" flex-1"></div>
            <div className="flex-1"></div>
          </div>
          <div className="  ml-10 grid grid-cols-4 gap-x-4  justify-items-start">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className=" bg-white p-1 w-52 mt-1  mb-6 text-blue-800 flex items-center justify-between font-medium text-sm rounded-lg tracking-wider border-2 border-blue-800   active:text-blue-300 "
            >
              YYY
              {!isOpen ? (
                <AiOutlineCaretDown className="h-8 mr-5" />
              ) : (
                <AiOutlineCaretUp className="h-8 mr-5" />
              )}
            </button>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className=" bg-white p-1 w-52 mt-1 mb-6  text-blue-800 flex items-center justify-between font-medium text-sm rounded-lg tracking-wider border-2 border-blue-800   active:text-blue-300 "
            >
              YYY
              {!isOpen ? (
                <AiOutlineCaretDown className="h-8 mr-5" />
              ) : (
                <AiOutlineCaretUp className="h-8 mr-5" />
              )}
            </button>

            <button className="p-1 w-36 mt-1 ml-12 mb-6  bg-green-700 text-white  rounded-lg shadow-lg hover:bg-green-600 ">
              <div className="relative ">
                <div className="flex justify-center">
                  <svg
                    className="w-6 h-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  ค้นหา
                </div>
              </div>
            </button>

            <button className="p-1 w-36 mt-1 mb-6  bg-yellow-700 text-white   rounded-lg shadow-lg hover:bg-yellow-600 ">
              <div className="relative ">
                <div className="flex justify-center">
                  <svg
                    className="w-6 h-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  ล้างค่า
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="">
          <div className="text-4xl my-3 text-blue-800 font-normal">
            รายการปริญญานิพนธ์
          </div>
          <div className="w-96 mb-7">
            {/* 👇️ basic horizontal line */}
            <hr />

            {/* 👇️ horizontal line with text */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{ flex: 1, height: "2.5px", backgroundColor: "#1976D2" }}
              />
            </div>
          </div>
          <div className="text-sm font-semibold text-blue-800 flex  text-start mb-2">
            <div className="w-52 ml-10 flex-grow">ชื่อเรื่อง</div>
            <div className="w-52">ปีการศึกษา</div>
            <div className="mr-10 ">ดาวน์โหลด</div>
          </div>
          <div className="h-32 flex flex-col justify-center rounded-2xl bg-white border mb-10 shadow-md ">
            <div className="text-start text-xs ml-10 ">
              <div className="text-xs font-semibold text-blue-800 flex  text-start  justify-center">
                <div className="flex-grow">
                  ระบบจัดการข้อมูลโครงงานทางเทคโนโลธุรกิจดิจิทัล กรณีศึกษา
                  คณะบริหารธุรกิจและสารสนเทศ สาขาเทคโนโลยีธุรกิจดิจิทัล{" "}
                </div>
                <div className="w-52 text-lg ">2566</div>
                <div className="mr-10 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-8 h-8 mr-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                </div>
              </div>
              <div>
                โดย ชนกนันท์ หิรัญนุเคราะห์, หทัยชนก ศิริกุล และ ศุภวัฒน์
                ฝัดวิเศษ
              </div>
              <div>อาจารย์ที่ปรึกษา : อาจารย์ศราวุธ ซื่อวุฒิกุล</div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Thesis;
