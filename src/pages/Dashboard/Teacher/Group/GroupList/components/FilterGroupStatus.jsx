import React, { useState } from "react";

const FilterGroupStatus = ({ group, setFilterGroup }) => {
  const [selectButton, setSelectButton] = useState("ทั้งหมด");
  const filterGroup = (status) => {
    setSelectButton(status);
    const filter = group.filter((item) => item.status === status);
    if (status === "ทั้งหมด") {
      setFilterGroup(group);
    } else {
      setFilterGroup(filter);
    }
  };

  const countFilter = (status) => {
    const filter = group.filter((item) => item.status === status);
    return filter.length;
  };

  return (
    <div className="flex flex-wrap">
      <button
        // className="mx-2 my-1 rounded-xl bg-light-blue-300 px-4 py-2"
        className={
          selectButton === "ทั้งหมด"
            ? "mx-2 my-1 rounded-xl bg-light-blue-500 px-4 py-2 text-white "
            : "mx-2 my-1 rounded-xl bg-light-blue-300 px-4 py-2 text-white"
        }
        onClick={() => filterGroup("ทั้งหมด")}
      >
        ทั้งหมด ({group.length})
      </button>
      <button
        className={
          selectButton === "ยังไม่ยื่นเสนอหัวข้อ"
            ? "mx-2 my-1 rounded-xl bg-light-blue-500 px-4 py-2 text-white "
            : "mx-2 my-1 rounded-xl bg-light-blue-300 px-4 py-2 text-white"
        }
        onClick={() => filterGroup("ยังไม่ยื่นเสนอหัวข้อ")}
      >
        ยังไม่ยื่นสอบหัวข้อ ({countFilter("ยังไม่ยื่นเสนอหัวข้อ")})
      </button>
      <button
        className={
          selectButton === "ยื่นเสนอหัวข้อ"
            ? "mx-2 my-1 rounded-xl bg-light-blue-500 px-4 py-2 text-white "
            : "mx-2 my-1 rounded-xl bg-light-blue-300 px-4 py-2 text-white"
        }
        onClick={() => filterGroup("ยื่นเสนอหัวข้อ")}
      >
        ยังไม่ยื่นสอบหัวข้อ ({countFilter("ยื่นเสนอหัวข้อ")})
      </button>
      <button
        className={
          selectButton === "ยังไม่ยื่นสอบหัวข้อ"
            ? "mx-2 my-1 rounded-xl bg-light-blue-500 px-4 py-2 text-white "
            : "mx-2 my-1 rounded-xl bg-light-blue-300 px-4 py-2 text-white"
        }
        onClick={() => filterGroup("ยังไม่ยื่นสอบหัวข้อ")}
      >
        ยังไม่ยื่นสอบหัวข้อ ({countFilter("ยังไม่ยื่นสอบหัวข้อ")})
      </button>
      <button
        className={
          selectButton === "สอบหัวข้อ"
            ? "mx-2 my-1 rounded-xl bg-light-blue-500 px-4 py-2 text-white "
            : "mx-2 my-1 rounded-xl bg-light-blue-300 px-4 py-2 text-white"
        }
        onClick={() => filterGroup("สอบหัวข้อ")}
      >
        สอบหัวข้อ ({countFilter("สอบหัวข้อ")})
      </button>
      <button
        className={
          selectButton === "ยังไม่ยื่นสอบก้าวหน้า"
            ? "mx-2 my-1 rounded-xl bg-light-blue-500 px-4 py-2 text-white "
            : "mx-2 my-1 rounded-xl bg-light-blue-300 px-4 py-2 text-white"
        }
        onClick={() => filterGroup("ยังไม่ยื่นสอบก้าวหน้า")}
      >
        ยังไม่ยื่นสอบก้าวหน้า ({countFilter("ยังไม่ยื่นสอบก้าวหน้า")})
      </button>
      <button
        className={
          selectButton === "สอบก้าวหน้า"
            ? "mx-2 my-1 rounded-xl bg-light-blue-500 px-4 py-2 text-white "
            : "mx-2 my-1 rounded-xl bg-light-blue-300 px-4 py-2 text-white"
        }
        onClick={() => filterGroup("สอบก้าวหน้า")}
      >
        สอบก้าวหน้า ({countFilter("สอบก้าวหน้า")})
      </button>
      <button
        className={
          selectButton === "ยังไม่ยื่นสอบป้องกัน"
            ? "mx-2 my-1 rounded-xl bg-light-blue-500 px-4 py-2 text-white "
            : "mx-2 my-1 rounded-xl bg-light-blue-300 px-4 py-2 text-white"
        }
        onClick={() => filterGroup("ยังไม่ยื่นสอบป้องกัน")}
      >
        ยังไม่ยื่นสอบป้องกัน ({countFilter("ยังไม่ยื่นสอบป้องกัน")})
      </button>
      <button
        className={
          selectButton === "สอบป้องกัน"
            ? "mx-2 my-1 rounded-xl bg-light-blue-500 px-4 py-2 text-white "
            : "mx-2 my-1 rounded-xl bg-light-blue-300 px-4 py-2 text-white"
        }
        onClick={() => filterGroup("สอบป้องกัน")}
      >
        สอบป้องกัน ({countFilter("สอบป้องกัน")})
      </button>
      <button
        className={
          selectButton === "รอส่งปริญญานิพนธ์"
            ? "mx-2 my-1 rounded-xl bg-light-blue-500 px-4 py-2 text-white "
            : "mx-2 my-1 rounded-xl bg-light-blue-300 px-4 py-2 text-white"
        }
        onClick={() => filterGroup("รอส่งปริญญานิพนธ์")}
      >
        รอส่งปริญญานิพนธ์ ({countFilter("รอส่งปริญญานิพนธ์")})
      </button>
      <button
        className={
          selectButton === "ส่งปริญญานิพนธ์แล้ว"
            ? "mx-2 my-1 rounded-xl bg-light-blue-500 px-4 py-2 text-white "
            : "mx-2 my-1 rounded-xl bg-light-blue-300 px-4 py-2 text-white"
        }
        onClick={() => filterGroup("ส่งปริญญานิพนธ์แล้ว")}
      >
        ส่งไฟล์ปริญญานิพนธ์แล้ว ({countFilter("ส่งปริญญานิพนธ์แล้ว")})
      </button>
    </div>
  );
};

export default FilterGroupStatus;
