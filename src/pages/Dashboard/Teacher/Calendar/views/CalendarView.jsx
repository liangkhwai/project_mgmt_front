import React, { useMemo, useState } from "react";
import Title from "../../../../../UI/Title";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import dayjs from "dayjs";
import thLocale from "@fullcalendar/core/locales/th";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Body from "../../../../../UI/Body";
const CalendarView = () => {
  const loadedEvents = useLoaderData();
  console.log(loadedEvents);
  const [events, setEvents] = useState([...loadedEvents]);

  const headerToolbar = useMemo(() => {
    return {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,list",
    };
  }, []);
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

  return (
    <div className="mx-10">
      <Title>ชั่วโมงว่าง</Title>
      <Body>
        <FullCalendar
          height={700}
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            listPlugin,
          ]}
          initialView="dayGridMonth"
          headerToolbar={headerToolbar}
          weekends={true}
          events={events}
          slotEventOverlap={true}
          dayMaxEvents={3}
          eventContent={eventDidMount}
          moreLinkContent={moreLinkContent}
          locale={thLocale}
          // eventClick={eventClick}
          forceEventDuration={true}
        />
      </Body>
    </div>
  );
};

export default CalendarView;
