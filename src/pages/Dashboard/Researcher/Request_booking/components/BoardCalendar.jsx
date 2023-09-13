import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import thLocale from "@fullcalendar/core/locales/th";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ModalBooking from "./ModalBooking";
import Modal from "../../../../../UI/Modal";
const BoardCalendar = ({ lastEvent }) => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState(null);

  useEffect(() => {
    async function getEventOnlyGroup() {
      const res = await fetch(
        `http://localhost:8080/free_hours/getEventOnlyGroup/${localStorage.getItem(
          "grpId"
        )}`,
        {
          method: "get",
          credentials: "include",
        }
      );

      const data = await res.json();
      console.log(data);
      setEvents(data);
    }

    getEventOnlyGroup();
  }, []);
  const eventDidMount = (info) => {
    const { event } = info;
    const eventTitle = event.title;
    console.log(event);
    const eventStart = dayjs(event.start).locale("th").format("HH:mm");
    const eventEnd = dayjs(event.end).locale("th").format("HH:mm");
    return {
      html: `
        <span class="cursor-pointer w-full border break-all rounded-md hover:opacity-80 bg-light-blue-400 text-black hover:text-white transition-colors delay-75">
          ${eventStart}-${eventEnd} <span class="font-bold">${event.title}</span> 
        </span>
      `,
    };
  };

  const eventClick = (info) => {
    console.log(info);
    setEventInfo(info.event);
    setModalOpen(true);
  };

  return (
    <div className="border mt-5 rounded-md border-gray-600">
      <div className="m-10 ">
        {events.length === 0 ? (
          <div className="text-center font-bold text-xl">
            ไม่พบเวลาอาจารย์ทั้ง 3 ท่านที่ตรงกัน กรุณาติดต่ออาจารย์
          </div>
        ) : (
          <FullCalendar
            height={700}
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin,
              listPlugin,
            ]}
            initialView="dayGridMonth"
            selectMirror={true}
            weekends={true}
            events={events}
            slotEventOverlap={true}
            dayMaxEvents={3}
            eventContent={eventDidMount}
            locale={thLocale}
            eventClick={eventClick}
          />
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalBooking eventInfo={eventInfo} lastEvent={lastEvent} />
      </Modal>
    </div>
  );
};

export default BoardCalendar;
