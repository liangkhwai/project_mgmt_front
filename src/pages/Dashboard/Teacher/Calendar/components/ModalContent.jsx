import React, { Fragment, useEffect, useState } from "react";
import { AddButton, DeleteButton } from "../../../../../UI/button";
import dayjs from "dayjs";
// import "dayjs/locale/th";
import { DayPicker } from "react-day-picker";
import { useMutation } from "react-query";
import DatePickerPopupStart from "./DatePickerPopupStart";
import DatePickerPopupEnd from "./DatePickerPopupEnd";
import DatePicker from "react-datepicker";
import "./CustomTimePicker.css";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
const ModalContent = ({
  selectedDate,
  setEvents,
  handleCloseModal,
  type,
  events,
}) => {
  const [date, setDate] = useState(selectedDate);
  const [dateStart, setDateStart] = useState(date.start);
  const [dateEnd, setDateEnd] = useState(date.end);
  const [hourAm, setHourAm] = useState(12);
  const [hourPm, setHourPm] = useState(13);
  const [isAllDay, setIsAllDay] = useState(selectedDate.allDay);
  const [isChecked, setIsChecked] = useState(false);
  const [isAddTime, setIsAddTime] = useState(false);
  const pmDefault = [
    {
      name: "00.00",
      val: 0,
    },
    {
      name: "01.00",
      val: 1,
    },
    {
      name: "02.00",
      val: 2,
    },
    {
      name: "03.00",
      val: 3,
    },
    {
      name: "04.00",
      val: 4,
    },
    {
      name: "05.00",
      val: 5,
    },
    {
      name: "06.00",
      val: 6,
    },
    {
      name: "07.00",
      val: 7,
    },
    {
      name: "08.00",
      val: 8,
    },
    {
      name: "09.00",
      val: 9,
    },
    {
      name: "10.00",
      val: 10,
    },
    {
      name: "11.00",
      val: 11,
    },
    {
      name: "12.00",
      val: 12,
    },
    {
      name: "13.00",
      val: 13,
    },
    {
      name: "14.00",
      val: 14,
    },
    {
      name: "15.00",
      val: 15,
    },
    {
      name: "16.00",
      val: 16,
    },
    {
      name: "17.00",
      val: 17,
    },
    {
      name: "18.00",
      val: 18,
    },
    {
      name: "19.00",
      val: 19,
    },
    {
      name: "20.00",
      val: 20,
    },
    {
      name: "21.00",
      val: 21,
    },
    {
      name: "22.00",
      val: 22,
    },
    {
      name: "23.00",
      val: 23,
    },
    {
      name: "24.00",
      val: 24,
    },
  ];
  const [am, setAm] = useState([
    {
      name: "00.00",
      val: 0,
    },
    {
      name: "01.00",
      val: 1,
    },
    {
      name: "02.00",
      val: 2,
    },
    {
      name: "03.00",
      val: 3,
    },
    {
      name: "04.00",
      val: 4,
    },
    {
      name: "05.00",
      val: 5,
    },
    {
      name: "06.00",
      val: 6,
    },
    {
      name: "07.00",
      val: 7,
    },
    {
      name: "08.00",
      val: 8,
    },
    {
      name: "09.00",
      val: 9,
    },
    {
      name: "10.00",
      val: 10,
    },
    {
      name: "11.00",
      val: 11,
    },
    {
      name: "12.00",
      val: 12,
    },
    {
      name: "13.00",
      val: 13,
    },
    {
      name: "14.00",
      val: 14,
    },
    {
      name: "15.00",
      val: 15,
    },
    {
      name: "16.00",
      val: 16,
    },
    {
      name: "17.00",
      val: 17,
    },
    {
      name: "18.00",
      val: 18,
    },
    {
      name: "19.00",
      val: 19,
    },
    {
      name: "20.00",
      val: 20,
    },
    {
      name: "21.00",
      val: 21,
    },
    {
      name: "22.00",
      val: 22,
    },
    {
      name: "23.00",
      val: 23,
    },
    {
      name: "24.00",
      val: 24,
    },
  ]);
  const [pm, setPm] = useState([
    ...pmDefault.filter((item) => item.val >= hourPm),
  ]);

  const startDate = dayjs(date.start.toString())
    .locale("th")
    .format("D MMMM YYYY");
  const endDate = dayjs(date.end.toString()).locale("th").format("D MMMM YYYY");
  const handleHourChangeAm = (event) => {
    const dayjsStart = dayjs(date.start.toString()).set(
      "hour",
      event.target.value,
    );
    console.log(dayjsStart);
    setHourAm(event.target.value);
    setDate((prev) => {
      return { ...prev, start: dayjs(dayjsStart.$d).$d };
    });
    const filterMoreThanAm = pmDefault.filter(
      (item) => item.val >= parseInt(event.target.value),
    );

    setPm([...filterMoreThanAm]);
    // setDateStart(dayjsStart);
  };
  const handleHourChangePm = (event) => {
    const dayjsEnd = dayjs(date.end.toString()).set("hour", event.target.value);
    // console.log(dayjsEnd);
    setHourPm(event.target.value);
    setDate((prev) => {
      return { ...prev, end: dayjs(dayjsEnd.$d).$d };
    });
    // setDateEnd(dayjsEnd);
  };

  const handleChangeCheckBox = (event) => {
    // console.log(event.target.checked);

    setIsAllDay(!isAllDay);
    if (date.type === "dayGridMonth") {
      setDate((prev) => {
        return { ...prev, allDay: !isChecked };
      });
    } else {
      setDate((prev) => {
        return { ...prev, allDay: !isChecked };
      });
    }
    setIsChecked(!isChecked);
  };

  const addTimeHandler = () => {
    // if (date.type === "dayGridMonth") {
    //   setDate((prev) => {
    //     return { ...prev, allDay: !prev.allDay };
    //   });
    // }
    // setIsAddTime(!isAddTime);
  };

  const mutation = useMutation({
    mutationFn: async (date) => {
      const response = await fetch("http://127.0.0.1:8080/free_hours/add", {
        method: "POST",
        body: JSON.stringify({ date: date, tchId: localStorage.getItem("id") }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      return response.json();
    },
    onSuccess: (data) => {
      console.log(date);
      console.log(data);
      const event = data;
      let dateStart = dayjs(event.start_time).$d;
      let dateEnd = dayjs(event.end_time).$d;
      if (event.allDay === true) {
        // dateStart = dayjs(event.start_time).add(7,'hour').set("minute", 0).$d;
        // dateEnd = dayjs(event.end_time).add(7,'hour')
        //   .add(1, "day")
        //   .set("minute", 0).$d;
      }
      event.start = dateStart;
      event.end = dateEnd;
      console.log(event);
      setEvents((prev) => [...prev, event]);
      handleCloseModal();
      Swal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "เพิ่มกิจกรรมสำเร็จ!",
      });
    },
    onError: (error) => {
      console.table(error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: `เพิ่มกิจกรรมไม่สำเร็จ! ${error.message}`,
      });
    },
  });

  const updateEvent = useMutation({
    mutationFn: async (event) => {
      const response = await fetch(
        "http://127.0.0.1:8080/free_hours/updateEvent",
        {
          method: "PATCH",
          body: JSON.stringify({ event: event }),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );
      return response.json();
    },
    onSuccess: (event) => {
      console.log(event);
      const updatedData = event;
      const eventTmp = [...events];
      const filterEvent = events.findIndex(
        (item, idx) => item.id === parseInt(updatedData.id),
      );
      eventTmp[filterEvent].title = updatedData.title;
      eventTmp[filterEvent].start = dayjs(updatedData.start).$d;
      eventTmp[filterEvent].end = dayjs(updatedData.end).$d;
      eventTmp[filterEvent].allDay = updatedData.allDay;
      console.log(eventTmp);
      setEvents([...eventTmp]);
      handleCloseModal();
    },
  });

  const deleteEvent = useMutation({
    mutationFn: async (id) => {
      const response = await fetch("http://127.0.0.1:8080/free_hours/delete", {
        method: "post",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
    onSuccess: (data) => {
      const eventId = data;
      const filterEvent = events.filter((item) => item.id !== data);
      console.log(filterEvent);
      setEvents(filterEvent);
      handleCloseModal();
    },
  });

  const updateEventHandler = () => {
    console.log(events);
    updateEvent.mutate(date);
  };

  const deleteEventHandler = () => {
    if (window.confirm("Are you sure delete this event ?")) {
      console.log(date.id);
      deleteEvent.mutate(date.id);
    }
  };

  const submitHandlerEvent = () => {
    Swal.fire({
      title: "เพิ่มกิจกรรม?",
      text: "คุณต้องการเพิ่มข้อมูลกิจกรรมนี้หรือไม่!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "เพิ่ม!",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        if (date.start > date.end) {
          console.log("more date");
          setDate((prev) => {
            return { ...prev, start: date.end, end: date.start };
          });
        }
        console.log(date);
        mutation.mutate(date);
      }
    });
  };

  const onChangeTimeStart = (info) => {
    console.log(info);
    setDate((prev) => ({ ...prev, start: info }));
  };
  const onChangeTimeEnd = (info) => {
    console.log(info);
    setDate((prev) => ({ ...prev, end: info }));
  };
  const minTime = dayjs().set("hour", 9).set("minute", 0).$d;
  const maxTime = dayjs().set("hour", 17).set("minute", 0).$d;
  return (
    <div>
      <div className="mb-3">
        {type === "add" ? (
          <input
            type="text"
            name=""
            id=""
            className="w-full rounded-md"
            placeholder="เพิ่มชื่อและเวลา"
            onChange={(e) =>
              setDate((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        ) : (
          <input
            type="text"
            name=""
            id=""
            className="w-full rounded-md"
            placeholder="เพิ่มชื่อและเวลา"
            value={date.title}
            onChange={(e) =>
              setDate((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        )}
      </div>
      <div></div>
      {/* {startDate} - {endDate} */}
      <div className="flex items-center ">
        <DatePickerPopupStart date={date} setDate={setDate} />
        <div className="ml-1 w-16 rounded-lg shadow hover:bg-gray-100">
          <DatePicker
            key={1}
            minTime={minTime}
            maxTime={maxTime}
            selected={date.start}
            onChange={(date) => onChangeTimeStart(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            ClassName="custom-datepicker-input"
            wrapperClassName="customWrapper"
            timeFormat="HH:mm"
            timeCaption="Time"
            dateFormat="HH:mm"
            popperPlacement="right"
            timela
          />
        </div>
        <div className="mx-3">ถึง</div>
        <DatePickerPopupEnd date={date} setDate={setDate} />
        <div className="ml-1 w-16 rounded-lg shadow hover:bg-gray-100">
          <DatePicker
            key={2}
            minTime={minTime}
            maxTime={maxTime}
            selected={date.end}
            onChange={(date) => onChangeTimeEnd(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeFormat="HH:mm"
            timeCaption="Time"
            dateFormat="HH:mm"
            popperPlacement="right"
          />
        </div>
        {/* {!isAddTime && (
          <div className="ml-3">
            <button
              className="border rounded-md px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm"
              onClick={() => addTimeHandler()}
            >
              เพิ่มเวลา
            </button>
          </div>
        )} */}
      </div>

      {isAddTime && (
        // <Fragment>
        //   <div className="my-3">
        //     <select onChange={handleHourChangeAm} value={hourAm}>
        //       {am.map((item, idx) => {
        //         return (
        //           <option key={idx} value={item.val}>
        //             {item.name}
        //           </option>
        //         );
        //       })}
        //     </select>
        //     -
        //     <select onChange={handleHourChangePm} value={hourPm}>
        //       {pm.map((item, idx) => {
        //         return (
        //           <option key={idx} value={item.val}>
        //             {item.name}
        //           </option>
        //         );
        //       })}
        //     </select>
        //     &emsp;
        //     {/* <input
        //       type="checkbox"
        //       name=""
        //       id=""
        //       checked={isChecked}
        //       onChange={(e) => handleChangeCheckBox(e)}
        //     />{" "}
        //     <span>ตลอดทั้งวัน</span> */}
        //   </div>
        // </Fragment>
        <div></div>
      )}

      {/* <div>
        เริ่ม : {dayjs(date.start.toString()).$d.toString()}
        <br />
        จบ : {dayjs(date.end.toString()).$d.toString()}
      </div> */}
      <div className="mt-4 text-center">
        {type === "add" ? (
          <AddButton onClick={() => submitHandlerEvent()}>บันทึก</AddButton>
        ) : (
          <Fragment>
            <AddButton onClick={() => updateEventHandler()}>บันทึก</AddButton>
            &nbsp;
            <DeleteButton
              onClick={() => {
                deleteEventHandler();
              }}
            >
              ลบ
            </DeleteButton>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ModalContent;
