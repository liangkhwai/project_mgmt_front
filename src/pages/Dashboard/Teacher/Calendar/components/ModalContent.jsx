import React, { Fragment, useEffect, useState } from "react";
import { AddButton } from "../../../../../UI/button";
import dayjs from "dayjs";
// import "dayjs/locale/th";
import { useMutation } from "react-query";
const ModalContent = ({ selectedDate, setEvents, handleCloseModal }) => {
  const [date, setDate] = useState(selectedDate);
  const [dateStart, setDateStart] = useState(date.start);
  const [dateEnd, setDateEnd] = useState(date.end);
  const [hourAm, setHourAm] = useState(12);
  const [hourPm, setHourPm] = useState(13);
  const [isAllDay, setIsAllDay] = useState(true);
  const [isAddTime, setIsAddTime] = useState(false);
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
 ]
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
  const [pm, setPm] = useState([...pmDefault.filter((item)=> item.val >= hourPm)]);
  useEffect(() => {
    console.log(date);
  }, [date]);

  const startDate = dayjs(date.start.toString())
    .locale("th")
    .format("D MMMM YYYY");
  const endDate = dayjs(date.end.toString()).locale("th").format("D MMMM YYYY");
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

  const handleChangeCheckBox = () => {
    setIsAllDay(!isAllDay);
    setDate((prev) => {
      return { ...prev, allDay: !isAllDay };
    });
  };

  const mutation = useMutation({
    mutationFn: async (date) => {
      const response = await fetch("http://localhost:8080/free_hours/add", {
        method: "POST",
        body: JSON.stringify({date:date,tchId:localStorage.getItem("id") }),
        credentials:"include",
        headers: { "Content-Type": "application/json" },
      });

      return response.json();
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const submitHandlerEvent = () => {
    console.log(date);

    console.log(date.start);
    console.log(date.end);
    setEvents((prev) => [...prev, date]);
    mutation.mutate(date)
    handleCloseModal();







  };

  return (
    <div>
      <div>
        <input
          type="text"
          name=""
          id=""
          className="w-full"
          placeholder="เพิ่มชื่อและเวลา"
          onChange={(e) =>
            setDate((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>
      <div></div>
      {startDate} - {endDate}{" "}
      <button
        className="border rounded-md p-1 text-gray-800 hover:bg-gray-100 text-sm"
        onClick={() => setIsAddTime(!isAddTime)}
      >
        เพิ่มเวลา
      </button>
      {isAddTime && (
        <Fragment>
          <div>
            <select onChange={handleHourChangeAm} value={hourAm}>
              {am.map((item, idx) => {
                return (
                  <option key={idx} value={item.val}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            -
            <select onChange={handleHourChangePm} value={hourPm}>
              {pm.map((item, idx) => {
                return (
                  <option key={idx} value={item.val}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            &emsp;
            <input
              type="checkbox"
              name=""
              id=""
              checked={isAllDay}
              onChange={() => handleChangeCheckBox()}
            />{" "}
            <span>ตลอดทั้งวัน</span>
          </div>
        </Fragment>
      )}
      <div>
        after Am : {hourAm}
        <br />
        after Pm : {hourPm}
        <br />
        after start : {dayjs(date.start.toString()).$d.toString()}
        <br />
        after start : {dayjs(date.end.toString()).$d.toString()}
      </div>
      <div className="my-1 text-center">
        <AddButton onClick={() => submitHandlerEvent()}>บันทึก</AddButton>
      </div>
    </div>
  );
};

export default ModalContent;
