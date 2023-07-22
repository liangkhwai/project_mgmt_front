
import dayjs from 'dayjs';
export async function getEventListTch(tchId){
    const response = await fetch("http://localhost:8080/free_hours/getEvent", {
        method: "post",
          body: JSON.stringify({ tchId: localStorage.getItem("id") }),
          headers: { "Content-Type": "application/json" },
      });
  
    const data = await response.json();

    const updateDateToDayJs = data.map((event)=>{
        const start = dayjs(event.start).$d
        const end = dayjs(event.end).$d
        return {
            ...event,start: start,end:end
          }

    })

    return updateDateToDayJs
}