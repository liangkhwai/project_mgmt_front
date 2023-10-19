import React, { useState, useEffect } from "react";

const FilterTeacherFree = ({ events, setFilterTeacherEvent }) => {
  const [teacherList, setTeacherList] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  useEffect(() => {
    const getTeacherList = async () => {
      const response = await fetch("http://34.126.100.66:8080/teachers/list");
      const data = await response.json();
      setTeacherList(data);
    };
    getTeacherList();
  }, []);

  const handleCheckboxChange = (teacherId) => {
    if (selectedTeachers.includes(teacherId)) {
      setSelectedTeachers(selectedTeachers.filter((id) => id !== teacherId));
    } else {
      setSelectedTeachers([...selectedTeachers, teacherId]);
    }
  };

  useEffect(() => {
    // Filter events based on selected teachers
    if (selectedTeachers.length === 0) {
      setFilterTeacherEvent(events); // No teachers selected, show all events
    } else {
      setFilterTeacherEvent(
        events.filter((event) => selectedTeachers.includes(event.teacherId)),
      );
    }
  }, [selectedTeachers, events, setFilterTeacherEvent]);

  return (
    <div>
      <div className="relative">
        <div className="">
          <div className="grid w-full grid-cols-3 grid-rows-3 place-items-center content-center  gap-y-3">
            {teacherList.map((teacher) => (
              <div
                key={teacher.id}
                // className="rounded-xl border bg-white px-4 py-1.5"
                className="mb-[0.125rem] block min-h-[1.5rem]  rounded-xl bg-white px-5 py-1 w-fit"
              >
                <input
                  id={teacher.id}
                  type="checkbox"
                  className="border-neutral-300 checked:border-primary checked:bg-primary dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary relative float-left -ml-[0rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  onChange={() => handleCheckboxChange(teacher.id)}
                  checked={selectedTeachers.includes(teacher.id)}
                />
                <label className="ml-2 text-sm" htmlFor={teacher.id}>
                  {teacher.prefix} {teacher.firstname} {teacher.lastname}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTeacherFree;
