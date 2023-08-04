import React from "react";
import { useState, Fragment } from "react";
import DatePickerPopupStart from "./DatePickerPopupStart";
import DatePickerPopupEnd from "./DatePickerPopupEnd";
import dayjs from "dayjs";
import { AddButton, DeleteButton } from "../../../../../UI/button";
import { useMutation } from "react-query";
import DatePicker from "react-datepicker";
import "./CustomTimePicker.css";
import "react-datepicker/dist/react-datepicker.css";
const ModalContentEdit = ({
  selectedDate,
  events,
  setEvents,
  handleCloseModal,
  type,
  calendarRef,
}) => {
  const [date, setDate] = useState(selectedDate);
  const [isAddTime, setIsAddTime] = useState(false);
  const [hourAm, setHourAm] = useState(12);
  const [hourPm, setHourPm] = useState(13);
  const [isChecked, setIsChecked] = useState(false);
  const [isAllDay, setIsAllDay] = useState(selectedDate.allDay);
  const addTimeHandler = () => {
    if (date.type === "dayGridMonth") {
      setDate((prev) => {
        return { ...prev, allDay: !prev.allDay };
      });
    }
    setIsAddTime(!isAddTime);
  };
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
  const handleHourChangeAm = (event) => {
    const dayjsStart = dayjs(date.start.toString()).set(
      "hour",
      event.target.value
    );
    console.log(dayjsStart);
    setHourAm(event.target.value);
    setDate((prev) => {
      return { ...prev, start: dayjs(dayjsStart.$d).$d };
    });
    const filterMoreThanAm = pmDefault.filter(
      (item) => item.val >= parseInt(event.target.value)
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
  const updateEvent = useMutation({
    mutationFn: async (event) => {
      const response = await fetch(
        "http://localhost:8080/free_hours/updateEvent",
        {
          method: "PATCH",
          body: JSON.stringify({ event: event }),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.json();
    },
    onSuccess: (event) => {
      const updatedData = event;
      console.log(event);
      console.log(events);
      const eventTmp = [...events];
      console.log(eventTmp);
      const filterEvent = events.findIndex(
        (item, idx) => item.id === parseInt(updatedData.id)
      );
      console.log(event);
      eventTmp[filterEvent].title = updatedData.title;
      eventTmp[filterEvent].start = dayjs(updatedData.start_time).$d;
      eventTmp[filterEvent].end = dayjs(updatedData.end_time).$d;
      eventTmp[filterEvent].allDay = updatedData.allDay;
      console.log(eventTmp[filterEvent]);
      console.log(eventTmp);
      setEvents((prev) =>
        prev.map((event) =>
          event.id === eventTmp[filterEvent].id
            ? { ...event, ...eventTmp[filterEvent] }
            : event
        )
      );

      handleCloseModal();
    },
  });

  const deleteEvent = useMutation({
    mutationFn: async (id) => {
      const response = await fetch("http://localhost:8080/free_hours/delete", {
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
    console.log(date);
    updateEvent.mutate(date);
  };

  const deleteEventHandler = () => {
    if (window.confirm("Are you sure delete this event ?")) {
      console.log(date.id);
      deleteEvent.mutate(date.id);
    }
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
      <div className="flex items-center my-3">
        <DatePickerPopupStart date={date} setDate={setDate} />
        <div className="w-16 rounded-lg hover:bg-gray-100 shadow ml-1">
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
            dateFormat="h:mm"
            popperPlacement="right"
          />
        </div>
        <div className="mx-3">ถึง</div>
        <DatePickerPopupEnd date={date} setDate={setDate} type="edit" />
        <div className="w-16 rounded-lg hover:bg-gray-100 shadow ml-1">
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
      </div>

      <div className="text-center">
        <AddButton onClick={() => updateEventHandler()}>บันทึก</AddButton>
        &nbsp;
        <DeleteButton
          onClick={() => {
            deleteEventHandler();
          }}
        >
          ลบ
        </DeleteButton>
      </div>
    </div>
  );
};

export default ModalContentEdit;
