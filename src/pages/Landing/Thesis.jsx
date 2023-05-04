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
              className=" bg-white p-1 w-80 mt-10  text-blue-800 flex items-center justify-between font-medium text-sm rounded-l-lg tracking-wider border-2 border-blue-800   active:text-blue-300 "
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
          <div className=" flex ml-10 ">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className=" bg-white p-1 w-52 mt-2  text-blue-800 flex items-center justify-between font-medium text-sm rounded-lg tracking-wider border-2 border-blue-800   active:text-blue-300 "
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
              className=" bg-white p-1 w-52 mt-2  text-blue-800 flex items-center justify-between font-medium text-sm rounded-lg tracking-wider border-2 border-blue-800   active:text-blue-300 "
            >
              YYY
              {!isOpen ? (
                <AiOutlineCaretDown className="h-8 mr-5" />
              ) : (
                <AiOutlineCaretUp className="h-8 mr-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thesis;
