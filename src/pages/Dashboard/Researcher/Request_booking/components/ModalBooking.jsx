import React from "react";
import dayjs from "dayjs";
const ModalBooking = ({ eventInfo }) => {
  console.log(eventInfo);
  return (
    <div>
      <div className="text-center text-xl">{eventInfo.title}</div>
      <div className="text-center my-3">
        <span className="mr-5">
          วัน{dayjs(eventInfo.start).locale("th").format("dddd")} ที่{" "}
          {dayjs(eventInfo.start).locale("th").format("DD MMMM YYYY")}
        </span>
        <span>
          เวลา {dayjs(eventInfo.start).locale("th").format("HH:mm")} -{" "}
          {dayjs(eventInfo.end).locale("th").format("HH:mm")}
        </span>
      </div>
      <div>
        <div className="my-3">รายชื่ออาจารย์</div>
        <div className="flex justify-around">
          {eventInfo.extendedProps.teacher.map((item, idx) => (
            <div key={idx}>
              {item.firstname} {item.lastname}
            </div>
          ))}
        </div>
      </div>
      <div>
        <button className="w-full px-4 py-2 bg-green-500 rounded-md mt-3 text-white hover:opacity-80">
          จองเวลาสอบ
        </button>
      </div>
    </div>
  );
};

export default ModalBooking;
