import React from "react";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const ModalBooking = ({ eventInfo, lastEvent }) => {
  const navigate = useNavigate();
  console.log(eventInfo);
  console.log(lastEvent);
  const eventSubmit = {
    requestId: lastEvent,
    start: eventInfo.start,
    end: eventInfo.end,
    eventId: eventInfo.extendedProps.teacher.map((item) => item.eventId),
  };

  const submitBooking = async () => {
    console.log(eventInfo);
    Swal.fire({
      title: "คุณต้องการจองเวลาสอบหรือไม่",
      text: "คุณจะไม่สามารถยกเลิกได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(eventSubmit);

        const response = await fetch(
          "http://localhost:8080/exam_booking/booking",
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventSubmit),
            credentials: "include",
          }
        );

        const notify = await fetch(
          "http://localhost:8080/teachers/line/notify",
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              teacher_id: eventInfo.extendedProps.teacher.map(
                (item) => item.id
              ),
            }),
          }
        );

        const data = await response.json();
        console.log(data);
        if (response.status === 200) {
          Swal.fire({
            title: "จองสำเร็จ",
            icon: "success",
            timer: 1000,
          }).then(() => {
            navigate("/dashboard/group");
          });
        } else {
          Swal.fire({
            title: "จองไม่สำเร็จ",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        }
      }
    });
  };

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
        <button
          className="w-full px-4 py-2 bg-green-500 rounded-md mt-3 text-white hover:opacity-80"
          onClick={submitBooking}
        >
          จองเวลาสอบ
        </button>
      </div>
    </div>
  );
};

export default ModalBooking;
