import React, { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import dayjs from "dayjs";
import th from 'dayjs/locale/th'

const DatePickerPopupEnd = ({ date, setDate,type }) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  const handleButtonClick = () => setShowPicker(!showPicker);

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onChangeDateHandler = (e) => {
    console.log(e);
    console.log(date);
    console.log(dayjs(date.end).$d);
    console.log(dayjs(e).get("date"));
    // console.log(dayjs(date.start).set('date',dayjs(e).get('date')).$d);
    const newDate = dayjs(date.end).set("date", dayjs(e).get("date")).$d;
    setDate((prev) => {
      return { ...prev, end: newDate };
    });
  };

  return (
    <div className="relative" ref={pickerRef}>
      <button
        className="px-4 py-2 text-black hover:bg-gray-100 rounded-lg shadow"
        onClick={handleButtonClick}
      >
        {dayjs(date.end.toString()).locale("TH").format("D MMMM YYYY")}
      </button>
      {showPicker && (
        <div className="absolute z-10 mt-2 p-5 bg-white">
          <DayPicker
            mode="single"
            selected={date.end}
            onSelect={onChangeDateHandler}
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerPopupEnd;
