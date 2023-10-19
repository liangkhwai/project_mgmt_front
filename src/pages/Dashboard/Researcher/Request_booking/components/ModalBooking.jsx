import React from "react";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const ModalBooking = ({ eventInfo, lastEvent, groupInfo }) => {
  const navigate = useNavigate();
  console.log(eventInfo);
  console.log(lastEvent);
  const eventSubmit = {
    requestId: lastEvent,
    start: eventInfo.start,
    end: eventInfo.end,
    eventId: eventInfo.extendedProps.teacher.map((item) => item.eventId),
    location: "",
  };

  const submitBooking = async () => {
    console.log(eventInfo);
    if(eventSubmit.location === ""){
      Swal.fire({
        title: "กรุณากรอกสถานที่สอบ",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
      return;
    }
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
          "http://34.126.100.66:8080/exam_booking/booking",
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventSubmit),
            credentials: "include",
          },
        );

        const notify = await fetch(
          "http://34.126.100.66:8080/teachers/line/notify",
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              teacher_id: eventInfo.extendedProps.teacher.map(
                (item) => item.id,
              ),
              groupInfo: groupInfo,
              event: eventSubmit,
            }),
          },
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
            text: `${data}`,
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
      <div className="my-3 text-center">
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
      <div className="my-3 flex items-center gap-1">
        <label htmlFor="location">สถานที่สอบ : </label>
        <input
          id="location"
          type="text"
          className="flex-grow rounded-xl"
          onChange={(e) => {
            eventSubmit.location = e.target.value;
          }}
        />
      </div>
      <div>
        <button
          className="mt-3 w-full rounded-md bg-green-500 px-4 py-2 text-white hover:opacity-80"
          onClick={submitBooking}
        >
          จองเวลาสอบ
        </button>
      </div>
    </div>
  );
};

export default ModalBooking;
