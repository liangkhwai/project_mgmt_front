import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import Title from "../../../../UI/Title";
import Body from "../../../../UI/Body";
import Modal from "../../../../UI/Modal";

const Calendar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState([]);
  const [events,setEvents] = useState([])
  const handleOpenModal = (date) => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const headerToolbar = {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay,list",
  };
  const calendarRef = useRef(null);

//   useEffect(() => {
//     const calendarApi = calendarRef.current.getApi();
//     calendarApi.setOption("selectable", true);
//     calendarApi.setOption("selectMirror", true);
//     calendarApi.setOption("select", handleDateSelect);
//   }, []);

  const handleSelect = (event) => {
    const newEvent = {
      title: 'My Event',
      start: event.start,
      end: event.end,
      allDay: event.allDay,
    };
    setEvents([...events, newEvent]);
  };

  

  return (
    <div className="mx-5">
      <Title>ลงชั่วโมงว่าง</Title>
      <Body>
        <div className="">
          <FullCalendar
            ref={calendarRef}
            // views={{
            //   day: {
            //     selectable: true,
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
            dateClick={handleOpenModal}
            headerToolbar={headerToolbar}
            selectable={true}
            weekends={true}
            select={handleSelect}
            events={events}
            slotEventOverlap={true}
            eventMaxStack={5}
            dayMaxEvents={3}
            />
            
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <div className="bg-blue-gray-200 z-auto text-white h-full w-full">
              {selectedDate}
            </div>
          </Modal>
        </div>
      </Body>
    </div>
  );
};

export default Calendar;
