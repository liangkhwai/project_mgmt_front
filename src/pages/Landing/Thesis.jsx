import React from "react";

const Thesis = () => {
  return (
    <div className="w-full h-screen border bg-blue-50 ">
      <div className="mx-48 ">
        <div className="h-64 flex flex-col justify-center rounded-2xl bg-white border mb-10 shadow-md mt-10">
          <div className="text-center text-2xl  ">
            <button className="relative flex flex-col it">Dropdown</button>
            <div>
              ไม่มีสิทธ์ในการเข้าถึง
              เนื่องจากยังไม่ได้รับอนุมัติในการส่งไฟล์ปริญญานิพนธ์
            </div>
            <div>กรุณาติดต่ออาจารย์ประจำวิชา</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thesis;
