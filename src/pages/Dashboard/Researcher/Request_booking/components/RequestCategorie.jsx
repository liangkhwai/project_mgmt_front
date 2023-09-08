import React from 'react'

const RequestCategorie = ({groupInfo}) => {
    const target = groupInfo?.status;
  let resultTarget;

  if (target === "ยังไม่ยื่นสอบหัวข้อ") {
    resultTarget = "สอบหัวข้อ";
  } else if (target === "อนุมัติยื่นสอบหัวข้อ") {
    resultTarget = "สอบก้าวหน้า";
  } else if (target === "ปฏิเสธยื่นสอบหัวข้อ") {
    resultTarget = "สอบหัวข้อ";
  } else if (target === "อนุมัติยื่นสอบก้าวหน้า") {
    resultTarget = "สอบป้องกัน";
  } else if (target === "ปฏิเสธยื่นสอบก้าวหน้า") {
    resultTarget = "สอบก้าวหน้า";
  } else if (target === "อนุมัติยื่นสอบป้องกัน") {
    resultTarget = "----------------";
    return (
      <div className="text-center text-xl   font-bold ">
        กลุ่มของคุณผ่านแล้ว กรุณายื่นไฟล์ปริญญานิพนธ์
      </div>
    );
  } else if (target === "ปฏิเสธยื่นสอบป้องกัน") {
    resultTarget = "สอบป้องกัน";
  } else {
    return (
      <div className="text-center text-xl   font-bold ">{target}จากอาจารย์</div>
    );
  }
  return (
    <div className="my-5">
          <div className="mb-1">
            <label htmlFor="type" className="">
              ประเภทการขอสอบ
            </label>
          </div>
          <input
            type="text"
            name=""
            id=""
            disabled={true}
            className="w-full rounded-md py-2 px-2"
            value={resultTarget}
          />
        </div>
  )
}

export default RequestCategorie