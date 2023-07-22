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

const Calendar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [eventEdit, setEventEdit] = useState();
  const [isEventEditOpen, setIsEventEditOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const data = useLoaderData()
  const [events, setEvents] = useState([...data]);
  const [eventsKey, setEventsKey] = useState(0);

  // const getEventList = useQuery({
  //   queryFn: async () => {
  //     const response = await fetch(
  //       "http://localhost:8080/free_hours/getEvent",
  //       {
  //         method: "post",
  //         body: JSON.stringify({ tchId: localStorage.getItem("id") }),
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );

  //     return response.json();
  //   },
  // });
  // useEffect(() => {
  //   if (getEventList.data) {
  //     console.log(getEventList.data);
  //     const updateToDayJs = getEventList.data.map((event)=>{
  //       const start = dayjs(event.start).$d
  //       const end = dayjs(event.end).$d

  //       return {
  //         ...event,start: start,end:end
  //       }
        
  //     })


  //     setEvents((prev) => [...prev, ...updateToDayJs]);
  //   }
  // }, [getEventList.data]);
  useEffect(()=>{
    console.log(events);
    setEventsKey((prev) => prev + 1);
  },[events])
 

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
      right: "dayGridMonth,timeGridWeek,timeGridDay,list",
    };
  }, []);

 
  const handleSelect = (event) => {
    console.log(event);

    let startTime = dayjs(event.start.toString()).$d;
    let endTime = dayjs(event.end.toString()).$d;
    console.log(startTime, endTime);
    let isAllDay = true;
    if (event.view.type === "dayGridMonth") {
      startTime = dayjs(event.start.toString()).set("hour", 12).$d;
      // .set("hour", 12).$d;
      endTime = dayjs(event.end.toString()).subtract(1,'day').set("hour", 13).$d;
      // .set("hour", 13).subtract(1, "day").$d;
    } else if (event.view.type === "timeGridWeek") {
      isAllDay = false;
    }else{
      isAllDay = false
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
    const eventStart = dayjs(event.start).locale("th").format("HH:mm");

    return {
      html: `
        <div class="cursor-pointer w-full">
          ${
            event.allDay === false ? eventStart : ""
          } &nbsp;<strong class="cursor-pointer">${eventTitle}</strong> 
        </div>
      `,
    };
  };

  const moreLinkContent = (event) => {
    return {
      html: `<strong className="m-2">อีก ${event.num} กิจกรรม</strong>`,
    };
  };
  const eventClick = (info) => {
    console.log(info);
    console.log(info.event.start);
    console.log(info.event.end);

    // let startTime = dayjs(info.event.start.toString()).$d;
    // let endTime = dayjs(info.event.end.toString()).$d;
    // let isAllDay = true;
    // if (event.view.type === "dayGridMonth") {
    //   startTime = dayjs(event.start.toString()).set("hour", 12).$d;
    //   endTime = dayjs(event.end.toString())
    //     .subtract(1, "day")
    //     .set("hour", 13).$d;
    // } else if (event.view.type === "timeGridWeek") {
    //   isAllDay = false;
    // }
    // console.log(endTime);

    const newEvent = {
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      allDay: info.event.allDay,
      id: parseInt(info.event.id),
      type: info.view.type,
    };

    console.log(newEvent);
    setEventEdit(newEvent);
    handleEventOpenModal();
  };

  return (
    <div className="mx-5">
      <Title>ลงชั่วโมงว่าง</Title>
      <Body>
        <div className="">
          <FullCalendar
            key={eventsKey}
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
            <div className=" z-auto h-full w-full  ">
              <ModalContent
              events={events}
                selectedDate={eventEdit}
                setEvents={setEvents}
                handleCloseModal={handleEventCloseModal}
                type="edit"
              />
            </div>
          </Modal>
        </div>
      </Body>
    </div>
  );
};

export default Calendar;
