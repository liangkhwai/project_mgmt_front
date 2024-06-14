import dayjs from "dayjs";
export async function getEventListTch(tchId) {
  const response = await fetch(process.env.REACT_APP_FREEHOUR_GET_BY_ID, {
    method: "post",
    body: JSON.stringify({ tchId: localStorage.getItem("id") }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  const updateDateToDayJs = data.map((event) => {
    const start = dayjs(event.start).$d;
    const end = dayjs(event.end).$d;
    return {
      ...event,
      start: start,
      end: end,
    };
  });

  return updateDateToDayJs;
}

export async function getAllEvents() {
  const response = await fetch(
    process.env.REACT_APP_FREEHOUR_GET_ALL,
    {
      method: "get",
      credentials: "include",
    }
  );

  const data = await response.json();

  const updateDateToDayJs = data.map((event) => {
    const start = dayjs(event.start).$d;
    const end = dayjs(event.end).$d;
    return {
      ...event,
      start: start,
      end: end,
    };
  });

  return updateDateToDayJs;
}
