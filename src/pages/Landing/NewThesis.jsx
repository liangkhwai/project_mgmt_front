import React, { useRef, useEffect, Fragment } from "react";
import {
  AiOutlineCaretDown,
  AiOutlineCaretUp,
  AiOutlineDown,
} from "react-icons/ai";
import { BsDownload, BsFillCloudDownloadFill } from "react-icons/bs";

const NewThesis = () => {
  const [theses, setTheses] = React.useState([]);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [openYear, setOpenYear] = React.useState("");
  const [openYearEnd, setOpenYearEnd] = React.useState("");

  const [detail, setDetail] = React.useState("รายละเอียดทั้งหมด");
  const [filterData, setFilterData] = React.useState(theses);
  const [searchData, setSearchData] = React.useState([]);
  const detailRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8080/thesis/all", {
        method: "GET",
      });
      const data = await res.json();
      console.log(data);
      const dataFilter = data.map(
        (item) => (item.researchers_names = item.researchers_names.split(","))
      );
      setTheses(data);
      setFilterData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (detailRef.current && !detailRef.current.contains(event.target)) {
        setOpenDetail(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [detailRef]);

  const setDetailFilter = (option) => {
    setDetail(option);
    setOpenDetail(false);
  };
  const dropdownOptions = [
    "ชื่อเรื่อง",
    "อาจารย์ที่ปรึกษา",
    "ผู้สร้างผลงาน",
    "รายละเอียดทั้งหมด",
  ];

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchData(query);
    if (detail === "ชื่อเรื่อง") {
      const filtered = theses.filter((item) => {
        const year = new Date(item.years).getFullYear() + 543;
        console.log(year);
        const isYearInRange =
          (!openYear || year >= parseInt(openYear)) &&
          (!openYearEnd || year <= parseInt(openYearEnd));

        return (
          item.title.toLowerCase().includes(query.toLowerCase()) &&
          isYearInRange
        );
      });
      setFilterData(filtered);
    } else if (detail === "อาจารย์ที่ปรึกษา") {
      const filtered = theses.filter((item) => {
        const year = new Date(item.years).getFullYear() + 543;
        console.log(year);
        const isYearInRange =
          (!openYear || year >= parseInt(openYear)) &&
          (!openYearEnd || year <= parseInt(openYearEnd));

        return (
          item.advisor_name.toLowerCase().includes(query.toLowerCase()) &&
          isYearInRange
        );
      });

      setFilterData(filtered);
    } else if (detail === "ผู้สร้างผลงาน") {
      const filtered = theses.filter((item) => {
        const year = new Date(item.years).getFullYear() + 543;
        console.log(year);
        const isYearInRange =
          (!openYear || year >= parseInt(openYear)) &&
          (!openYearEnd || year <= parseInt(openYearEnd));

        return (
          item.researchers_names
            .join("")
            .toLowerCase()
            .includes(query.toLowerCase()) && isYearInRange
        );
      });

      setFilterData(filtered);
    } else if (detail === "รายละเอียดทั้งหมด") {
      const filtered = theses.filter((item) => {
        const year = new Date(item.years).getFullYear() + 543;
        console.log(year);
        const isYearInRange =
          (!openYear || year >= parseInt(openYear)) &&
          (!openYearEnd || year <= parseInt(openYearEnd));

        return (
          (item.title.toLowerCase().includes(query.toLowerCase()) ||
            (item.advisor_name &&
              item.advisor_name.toLowerCase().includes(query.toLowerCase())) ||
            (item.researchers_names &&
              item.researchers_names.some((name) =>
                name.toLowerCase().includes(query.toLowerCase())
              ))) &&
          isYearInRange
        );
      });

      setFilterData(filtered);
    }
  };

  const clearFilter = () => {
    setFilterData(theses);
    setOpenYear("");
    setOpenYearEnd("");
    setSearchData("");
    setDetail("รายละเอียดทั้งหมด");
  };

  return (
    <div className="">
      <div className="mx-10 md:mx-16 xl:mx-36 my-5">
        <div className="border px-5 py-6 rounded-xl">
          <div className="md:grid md:grid-cols-12 flex flex-col">
            <div className="col-span-4">
              <div className="relative h-full" ref={detailRef}>
                <button
                  className=" w-full h-full border border-blue-400 rounded-tl-md rounded-bl-md border-r-transparent text-blue-600 flex items-center justify-between px-10"
                  onClick={() => setOpenDetail(!openDetail)}
                >
                  {detail}{" "}
                  {openDetail ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                </button>
                {openDetail && (
                  <div className="z-10 flex flex-col w-full absolute bg-white border shadow-lg rounded-lg text-blue-800 font-medium text-sm">
                    {dropdownOptions.map((option, index) => (
                      <button
                        key={index}
                        className="p-2 hover:bg-blue-100 "
                        onClick={() => setDetailFilter(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-8">
              <div className="w-full h-full">
                <input
                  className="w-full h-full rounded-tr-md rounded-br-md border-blue-400 px-10"
                  type="text"
                  name=""
                  id=""
                  placeholder="ค้นหาปริญญานิพนธ์..."
                  onChange={handleSearch}
                  value={searchData}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col my-5  xl:flex-col 2xl:flex-row ">
            <div className="flex gap-10 justify-center xl:justify-center">
              <div className="gap-1 relative h-[60%]">
                <div className="text-blue-600">ปีเริ่มต้น</div>
                <input
                  type="number"
                  name=""
                  id=""
                  value={openYear}
                  onChange={(e) => setOpenYear(e.target.value)}
                  className="w-full h-full border rounded-md border-blue-400   flex items-center justify-between gap-20 md:gap-20 lg:gap-32 xl:gap-60 py-1 px-3"
                />
              </div>
              <div className="gap-1 relative h-[60%]">
                <div className="text-blue-600">ปีสิ้นสุด</div>
                <input
                  type="number"
                  name=""
                  id=""
                  value={openYearEnd}
                  onChange={(e) => setOpenYearEnd(e.target.value)}
                  className="w-full h-full border rounded-md border-blue-400   flex items-center justify-between gap-20 md:gap-20 lg:gap-32 xl:gap-60 py-1 px-3"
                />
              </div>
            </div>
            <div className="flex gap-2 xl:gap-2 2xl:gap-5 flex-grow justify-center min-w-md">
              <button className="p-1 px-10 py-3 mt-4 bg-green-700 text-white rounded-lg shadow-lg hover:bg-green-600">
                <div className="">
                  <div className="flex justify-center">
                    <svg
                      className="w-6 h-5 mr-2"
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
              <button
                className="p-1 px-10 py-3 mt-4 bg-yellow-700 text-white rounded-lg shadow-lg hover:bg-yellow-600"
                onClick={clearFilter}
              >
                <div className="">
                  <div className="flex justify-center">
                    <svg
                      className="w-6 h-5 mr-2"
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
        </div>
        <div>
          <div className="text-3xl text-blue-700 my-5 ">
            รายการปริญญานิพนธ์
            <div className="my-3"></div>
            <div className="w-[40%]">
              <hr className="border border-blue-700" />
            </div>
          </div>

          <div className="grid grid-cols-6 px-5 py-3">
            <div className="col-span-4 text-blue-700">ชื่อเรื่อง</div>
            <div className="text-center text-blue-700">ปีการศึกษา</div>
            <div className="text-center text-blue-700">ดาวน์โหลด</div>
          </div>

          {filterData.map((thesis) => (
            <Fragment>
              <div className="md:grid md:grid-cols-6 p-5 border rounded-2xl flex flex-col mb-3">
                <div className="col-span-4 text-start">
                  <div className="text-xl text-blue-600">{thesis.title}</div>
                  <div>
                    โดย{" "}
                    {thesis.researchers_names.map((name, index) => {
                      if (index === 0) {
                        // Last item, append "และ" before the name
                        return `${name} `;
                      } else if (
                        index ===
                        thesis.researchers_names.length - 1
                      ) {
                        return `และ ${name} `;
                      } else {
                        return `,${name} `;
                      }
                    })}
                  </div>
                  <div>อาจารย์ที่ปรึกษา : อาจารย์ {thesis.advisor_name}</div>
                </div>
                <div className="text-center self-center">
                  {new Date(thesis.years).getFullYear(500) + 543}
                </div>
                <div className="text-center self-center">
                  <button
                    className="px-4 py-2 rounded-xl bg-green-500 text-white"
                    onClick={() =>
                      window.open(
                        `http://localhost:8080/files/thesis/${thesis.filename}`,
                        "_blank"
                      )
                    }
                  >
                    <BsDownload />
                  </button>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewThesis;
