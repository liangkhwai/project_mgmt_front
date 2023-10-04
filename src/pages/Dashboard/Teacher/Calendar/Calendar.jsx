import React, { useState, useRef, useEffect, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import Title from "../../../../UI/Title";
import Body from "../../../../UI/Body";
import Modal from "../../../../UI/Modal";
import ModalContent from "./components/ModalContent";
import dayjs from "dayjs";
import thLocale from "@fullcalendar/core/locales/th";
import { useQuery } from "react-query";
import { useLoaderData } from "react-router-dom";
import ModalContentView from "./components/ModalContentView";
// import "D:/project_mgmt/src/pages/Dashboard/Teacher/Calendar/components/CustomCalendar.css";
import "./components/CustomCalendar.css";
const Calendar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [eventEdit, setEventEdit] = useState();
  const [isEventEditOpen, setIsEventEditOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const data = useLoaderData();
  const [events, setEvents] = useState([...data]);
  const calendarRef = useRef();
  useEffect(() => {}, []);

  const handleOpenModal = (date) => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEventOpenModal = () => {
    setIsEventEditOpen(true);
  };
  const handleEventCloseModal = () => {
    setIsEventEditOpen(false);
  };

  const headerToolbar = useMemo(() => {
    return {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,list",
    };
  }, []);

  const handleSelect = (event) => {
    console.log("this is select !!!!!!!!!!!!!!!");

    console.log(event);
    let startTime = dayjs(event.start.toString()).$d;
    let endTime = dayjs(event.end.toString()).$d;
    let isAllDay = false;
    if (event.view.type === "dayGridMonth") {
      startTime = dayjs(event.start.toString()).set("hour", 12).$d;
      // .set("hour", 12).$d;
      endTime = dayjs(event.end.toString())
        .subtract(1, "day")
        .set("hour", 13).$d;
      // .set("hour", 13).subtract(1, "day").$d;

      // endTime = dayjs(event.end.toString()).subtract(1, "minute").$d;
    } else if (event.view.type === "timeGridWeek") {
      isAllDay = false;
    } else {
      isAllDay = false;
    }
    console.log(endTime);

    const newEvent = {
      title: "(ไม่มีชื่อ)",
      start: startTime,
      end: endTime,
      allDay: isAllDay,
      type: event.view.type,
    };

    console.log(newEvent);
    setSelectedDate(newEvent);
    handleOpenModal();
    // setEvents([...events, newEvent]);
  };

  const eventDidMount = (info) => {
    const { event } = info;
    const eventTitle = event.title;
    console.log(event);
    const eventStart = dayjs(event.start).locale("th").format("HH:mm");
    const eventEnd = dayjs(event.end).locale("th").format("HH:mm");
    return {
      html: `
        <span class="cursor-pointer w-full border break-all rounded-md hover:opacity-80" style="background-color:${event.extendedProps.teacher.color_calendar}">
          ${eventStart}-${eventEnd} <span class="font-bold">${event.extendedProps.teacher.firstname}</span> 
        </span>
      `,
    };
  };

  const moreLinkContent = (event) => {
    return {
      html: `<strong className="m-2">อีก ${event.num} กิจกรรม</strong>`,
    };
  };

  const eventClick = (info) => {
    console.log("this is event click !!!!!!!!!!!!!!!");
    console.log(info);
    console.log(info.event.start);
    console.log(info.event.end);
    const newEvent = {
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      allDay: info.event.allDay,
      id: parseInt(info.event.id),
      type: info.view.type,
      teacher: info.event.extendedProps.teacher,
    };

    console.log(newEvent);
    setEventEdit(newEvent);
    handleEventOpenModal();
  };
  const slotFormat = {
    hour: "2-digit", // Display hours in 2-digit format (e.g., 01, 02, ..., 12)
    minute: "2-digit", // Display minutes in 2-digit format (e.g., 00, 01, ..., 59)
    omitZeroMinute: false, // Include zero minutes (e.g., 01:00, 02:30, ...)
    meridiem: false, // Remove AM/PM from the label
  };
  return (
    <div className="mx-10">
      <Title>ลงชั่วโมงว่าง</Title>
      <Body>
        <div className="">
          <FullCalendar
            ref={calendarRef}
            height={700}
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin,
              listPlugin,
            ]}
            initialView="dayGridMonth"
            selectMirror={true}
            headerToolbar={headerToolbar}
            selectable={true}
            weekends={true}
            select={handleSelect}
            events={events}
            slotEventOverlap={true}
            dayMaxEvents={3}
            eventContent={eventDidMount}
            moreLinkContent={moreLinkContent}
            locale={thLocale}
            eventClick={eventClick}
            forceEventDuration={true}
            slotMinTime="09:00:00"
            slotMaxTime="17:00:01"
            slotLabelFormat={slotFormat}
          />
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <div className=" z-auto h-full w-full  ">
              <ModalContent
                selectedDate={selectedDate}
                setEvents={setEvents}
                handleCloseModal={handleCloseModal}
                type="add"
              />
            </div>
          </Modal>
          <Modal isOpen={isEventEditOpen} onClose={handleEventCloseModal}>
            <div className="!z-50 h-full w-full  ">
              <ModalContentView
                events={events}
                selectedDate={eventEdit}
                setEvents={setEvents}
                handleCloseModal={handleEventCloseModal}
                type="edit"
                calendarRef={calendarRef}
              />
            </div>
          </Modal>
        </div>
      </Body>
    </div>
  );
};

export default Calendar;
