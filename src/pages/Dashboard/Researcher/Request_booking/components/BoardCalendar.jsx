import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import thLocale from "@fullcalendar/core/locales/th";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const BoardCalendar = ({ groupInfo }) => {
  const [events, setEvents] = useState([]);
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


  

  return (
    <div className="border mt-5 rounded-md border-gray-600">
      <div className="m-10 ">
        {!events.length === 0 ?
        
    
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
          //  headerToolbar={headerToolbar}
          // selectable={true}
          weekends={true}
          //  select={handleSelect}
          events={events}
          slotEventOverlap={true}
          dayMaxEvents={3}
           eventContent={eventDidMount}
          //  moreLinkContent={moreLinkContent}
          locale={thLocale}
          //  eventClick={eventClick}
          // forceEventDuration={true}
          // slotMinTime="09:00:00"
          // slotMaxTime="17:00:01"
          //  slotLabelFormat={slotFormat}
        />
    :
    
    <div className="text-center font-bold text-xl">ไม่พบเวลาอาจารย์ทั้ง 3 ท่านที่ตรงกัน กรุณาติดต่ออาจารย์</div>
    
    }
      </div>
    </div>
  );
};

export default BoardCalendar;
