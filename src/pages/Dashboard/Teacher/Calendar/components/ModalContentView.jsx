import React from "react";
import { useState } from "react";
import dayjs from "dayjs";

const ModalContentView = ({ selectedDate }) => {
  console.log(selectedDate);

  const [event, setEvent] = useState(selectedDate);
  const startDate = dayjs(event.start).format("LLL");
  const endDate = dayjs(event.end).format("LLL");
  const isDateRangeLongerThanOneDay =
    dayjs(event.end).diff(dayjs(event.start), "days") > 1;

  console.log(isDateRangeLongerThanOneDay);

  const onlyTimeEnd = dayjs(event.end).format("LT");
  const allDayOne = dayjs(event.start).format("วันdddd, D MMMM");

  const allDayMultiDays = `${dayjs(event.start).format("D")} - ${dayjs(
    event.end
  )
    .subtract(1, "day")
    .format("D MMMM YYYY")}`;

  return (
    <div>
      <div className="text-3xl">{event.title}</div>

      {isDateRangeLongerThanOneDay ? (
        event.allDay ? (
          <div className="flex flex-row items-center my-2">
            <div>{allDayMultiDays}</div>
          </div>
        ) : (
          <div className="flex flex-row items-center my-2">
            <div>{startDate}</div>
            <span className="mx-2">-</span>
            <div>{endDate}</div>
          </div>
        )
      ) : event.allDay ? (
        <div className="flex flex-row items-center my-2">
          <div>{allDayOne}</div>
          {/* <div>{startDate}</div>
        <span className="mx-2">-</span>
        <div>{onlyTimeEnd}</div> */}
        </div>
      ) : (
        <div className="flex flex-row items-center my-2">
          {/* <div>{allDayOne}</div> */}
          <div>{startDate}</div>
          <span className="mx-2">-</span>
          {dayjs(event.end).diff(dayjs(event.start), "days") > 0 ? (
            <div>{endDate}</div>
          ) : (
            <div>{onlyTimeEnd}</div>
          )}
        </div>
      )}

      <div className="">By {event.teacher.firstname} {event.teacher.lastname}</div>
    </div>
  );
};

export default ModalContentView;
