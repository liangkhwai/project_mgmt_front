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
import thLocale from '@fullcalendar/core/locales/th';

const Calendar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [events, setEvents] = useState([]);
  const handleOpenModal = (date) => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const headerToolbar = useMemo(() => {
    return {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,list",
    };
  }, []);
  const calendarRef = useRef(null);

  //   useEffect(() => {
  //     const calendarApi = calendarRef.current.getApi();
  //     calendarApi.setOption("selectable", true);
  //     calendarApi.setOption("selectMirror", true);
  //     calendarApi.setOption("select", handleDateSelect);
  //   }, []);

  const handleSelect = (event) => {
    console.log(event);
    // const endDate = new Date(event.endStr);
    // endDate.setDate(endDate.getDate() - 1);
    // endDate.setHours(0);
    // const subtractDate = endDate.toISOString().split("T")[0];
    // console.log(subtractDate);

    // const newDateEnd = new Date(subtractDate);

    // const startTime = dayjs(event.start.toString()).set("hour", 12).$d;
    let startTime = dayjs(event.start.toString()).$d;
    let endTime = dayjs(event.end.toString()).$d;
    let isAllDay = true;
    if (event.view.type === "dayGridMonth") {
      startTime = dayjs(event.start.toString()).set("hour", 12).$d;
      endTime = dayjs(event.end.toString())
        .subtract(1, "day")
        .set("hour", 13).$d;
    } else if (event.view.type === "timeGridWeek") {
      isAllDay = false;
    }
    console.log(endTime);

    const newEvent = {
      title: "(ไม่มีชื่อ)",
      start: startTime,
      end: endTime,
      allDay: isAllDay,
    };

    console.log(newEvent);
    setSelectedDate(newEvent);
    handleOpenModal();
    // setEvents([...events, newEvent]);
  };
  const handleClick = (event) => {
    console.log(event);

    const newEvent = {  
      title: "(ไม่มีชื่อ)",
      date: event.date,
      allDay: event.allDay,
    };
    
  };
  const eventDidMount = (info) => {
    // Modify the event format
    // console.log(info);
    // const eventEl = info.el;
    // const eventTitle = info.event.title;
    // const eventStart = dayjs(info.event.start).locale('th').format('HH:mm');
    // const eventEnd = dayjs(info.event.end).locale('th').format('HH:mm');

    // // Customize the event content, e.g., change the event title or add additional information
    // // eventEl.innerHTML = `<strong>${eventTitle}</strong><br>Start: ${eventStart}<br>End: ${eventEnd}`;
    // eventEl.innerHTML = `<strong>${eventTitle}</strong> &nbsp;${eventStart}`;
    const { event } = info;
    console.log(event);
    const eventTitle = event.title;
    const eventStart = dayjs(event.start).locale("th").format("HH:mm");
    const eventEnd = dayjs(event.end).locale("th").format("HH:mm");

    return {
      html: `
        <div class{${event.allDay === true && "bg-light-blue-600"}}}>
          ${
            event.allDay === false ? eventStart : ""
          } &nbsp;<strong>${eventTitle}</strong> 
        </div>
      `,
    };
  };

  const moreLinkContent = (event) => {
    return {
      html: `<strong className="m-2">อีก ${event.num} กิจกรรม</strong>`,
    };
  };

  return (
    <div className="mx-5">
      <Title>ลงชั่วโมงว่าง</Title>
      <Body>
        <div className="">
          <FullCalendar
            ref={calendarRef}
            // timeZone="local"
            // views={{
            //   day: {
            //     slotDuration: "00:30:00",
            //     slotMinTime: "09:00:00",
            //     slotMaxTime: "19:00:00",
            //     selectMinDistance: 3,
            //     selectable: true,
            //     selectMirror: true,
            //     dateClick: handleClick,
            //   },
            //   week: {
            //     slotDuration: "00:30:00",
            //     slotMinTime: "09:00:00",
            //     slotMaxTime: "19:00:00",
            //     selectMinDistance: 3,
            //     selectable: true,
            //     selectMirror: true,
            //   },
            // }}
            // width={150}
            height={700}
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin,
              listPlugin,
            ]}
            initialView="dayGridMonth"
            // dateClick={handleClick}
            selectMirror={true}
            headerToolbar={headerToolbar}
            selectable={true}
            weekends={true}
            select={handleSelect}
            events={events}
            slotEventOverlap={true}
            // eventMaxStack={5}
            dayMaxEvents={3}
            // defaultAllDay={false}
            eventContent={eventDidMount}
            moreLinkContent={moreLinkContent}
            locale={thLocale}
          />

          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <div className=" z-auto h-full w-full  ">
              <ModalContent
                selectedDate={selectedDate}
                setEvents={setEvents}
                handleCloseModal={handleCloseModal}
              />
            </div>
          </Modal>
        </div>
      </Body>
    </div>
  );
};

export default Calendar;
