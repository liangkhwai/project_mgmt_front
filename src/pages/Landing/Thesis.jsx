import React, { useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

const Thesis = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedStartYear, setSelectedStartYear] = useState(null);
  const [selectedEndYear, setSelectedEndYear] = useState(null);

  const dropdownOptions = [
    "ชื่อเรื่อง",
    "อาจารย์ที่ปรึกษา",
    "ผู้สร้างผลงาน",
    "รายละเอียดทั้งหมด",
  ];

  const handleDropdownSelect = (option, dropdown) => {
    setSelectedOption(option);
    setIsOpen1(false);

    if (dropdown === "startYear") {
      setSelectedStartYear(option);
      setIsOpen2(false);
    } else if (dropdown === "endYear") {
      setSelectedEndYear(option);
      setIsOpen3(false);
    }
  };

  const dropdownYears = [
    "YYYY",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
  ];

  return (
    <div className="h-screen w-full border bg-blue-50">
      <div className="mx-48">
        <div className="my-10 flex h-auto flex-col justify-center rounded-2xl border bg-white shadow-md">
          <div className="flex justify-between">
            <div className="relative items-center rounded-lg">
              <button
                onClick={() => setIsOpen1(!isOpen1)}
                className="mt-10 flex w-80 items-center justify-between rounded-l-lg border-2 border-blue-800 bg-white p-1 text-sm font-medium tracking-wider text-blue-800 active:text-blue-300"
              >
                รายละเอียดทั้งหมด
                {!isOpen1 ? (
                  <AiOutlineCaretDown className="mr-5 h-8" />
                ) : (
                  <AiOutlineCaretUp className="mr-5 h-8" />
                )}
              </button>
              {isOpen1 && (
                <div className="absolute z-10 mt-1 w-80 rounded-lg border bg-white text-sm font-medium text-blue-800 shadow-lg">
                  {dropdownOptions.map((option) => (
                    <div
                      key={option}
                      className="cursor-pointer p-2 hover:bg-blue-100"
                      onClick={() => handleDropdownSelect(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative mr-10 mt-10 w-full">
              <input
                type="search"
                id="search-dropdown"
                className="border-l-1 z-20 block w-full rounded-r-lg border-2 border-blue-800 border-l-blue-800 bg-white p-2.5  text-sm text-black focus:border-blue-500 focus:ring-blue-500 dark:border-blue-800 dark:border-l-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-800"
                placeholder="ค้นหาปริญญานิพนธ์...."
                required
              />
            </div>
          </div>

          <div className="mx-10 mt-10 flex items-center justify-between  ">
            <div className="flex gap-10">
              <div className="text-sm font-medium text-blue-800">
                ปีเริ่มต้น
                <div className="flex-1">
                  <div className="relative">
                    <button
                      onClick={() => setIsOpen2(!isOpen2)}
                      className="mb-1 mt-1 flex w-56 items-center justify-between rounded-lg border-2 border-blue-800 bg-white p-1 text-sm font-medium tracking-wider text-blue-800 active:text-blue-300"
                    >
                      {selectedStartYear || "YYYY"}
                      {!isOpen2 ? (
                        <AiOutlineCaretDown className="mr-5 h-8" />
                      ) : (
                        <AiOutlineCaretUp className="mr-5 h-8" />
                      )}
                    </button>
                    {isOpen2 && (
                      <div className="absolute w-56 rounded-lg border bg-white text-sm font-medium text-blue-800 shadow-lg">
                        {dropdownYears.map((year) => (
                          <div
                            key={year}
                            className="cursor-pointer p-2 hover:bg-blue-100"
                            onClick={() =>
                              handleDropdownSelect(year, "startYear")
                            }
                          >
                            {year}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium text-blue-800">
                ปีสิ้นสุด
                <div className="flex-1">
                  <div className="relative">
                    <button
                      onClick={() => setIsOpen3(!isOpen3)}
                      className=" mb-1 mt-1 flex w-52 items-center justify-between rounded-lg border-2 border-blue-800 bg-white p-1 text-sm font-medium tracking-wider text-blue-800 active:text-blue-300"
                    >
                      {selectedEndYear || "YYYY"}
                      {!isOpen3 ? (
                        <AiOutlineCaretDown className="mr-5 h-8" />
                      ) : (
                        <AiOutlineCaretUp className="mr-5 h-8" />
                      )}
                    </button>
                    {isOpen3 && (
                      <div className="absolute mt-1 w-52 rounded-lg border bg-white text-sm font-medium text-blue-800 shadow-lg">
                        {dropdownYears.map((year) => (
                          <div
                            key={year}
                            className="cursor-pointer p-2 hover:bg-blue-100"
                            onClick={() =>
                              handleDropdownSelect(year, "endYear")
                            }
                          >
                            {year}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-grow justify-center gap-10">
              <button className="mt-4 rounded-lg bg-green-700 p-1 px-10 py-3 text-white shadow-lg hover:bg-green-600">
                <div className="">
                  <div className="flex justify-center">
                    <svg
                      className="mr-2 h-5 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    ค้นหา
                  </div>
                </div>
              </button>
              <button className="mt-4 rounded-lg bg-yellow-700 p-1 px-10 py-3 text-white shadow-lg hover:bg-yellow-600">
                <div className="">
                  <div className="flex justify-center">
                    <svg
                      className="mr-2 h-5 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    ล้างค่า
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="ml-10">
            <div className="my-3 text-4xl font-normal text-blue-800">
              รายการปริญญานิพนธ์
            </div>
            <div className="mb-7 w-96">
              <hr className="border-blue-800" />
            </div>
            <div className="mb-2 flex text-start text-sm font-semibold text-blue-800">
              <div className="ml-10 w-52 flex-grow">ชื่อเรื่อง</div>
              <div className="w-52">ปีการศึกษา</div>
              <div className="mr-10">ดาวน์โหลด</div>
            </div>
            <div className="mb-10 flex h-32 flex-col justify-center rounded-2xl border bg-white shadow-md">
              <div className="ml-10 text-start text-xs">
                <div className="flex justify-center text-start text-xs font-semibold text-blue-800">
                  <div className="flex-grow">
                    ระบบจัดการข้อมูลโครงงานทางเทคโนโลธุรกิจดิจิทัล กรณีศึกษา
                    คณะบริหารธุรกิจและสารสนเทศ สาขาเทคโนโลยีธุรกิจดิจิทัล
                  </div>
                  <div className="w-52 text-lg">2566</div>
                  <div className="mr-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="mr-5 h-8 w-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
    </div>
  );
};

export default Thesis;
