import React from "react";
import Swal from "sweetalert2";
const TeacherInfo = ({ information, setinformation }) => {
  const onChangeInputHandler = (e) => {
    setinformation({
      ...information,
      data: {
        ...information.data,
        [e.target.name]: e.target.value,
      },
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(information);
    Swal.fire({
      title: "คุณต้องการบันทึกข้อมูลใช่หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่ใช่",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch("http://localhost:8080/teachers/update", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...information.data }),
        })
          .then(async (res) => await res.json())
          .then((data) => {
            if (data) {
              Swal.fire({
                title: "บันทึกข้อมูลสำเร็จ",
                icon: "success",
                confirmButtonText: "ตกลง",
              });
            } else {
              Swal.fire({
                title: "บันทึกข้อมูลไม่สำเร็จ",
                icon: "error",
                confirmButtonText: "ตกลง",
              });
            }
          });
      }
    });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col ">
          <label htmlFor="firstname">ชื่อ</label>
          <input
            type="text"
            value={information.data.firstname}
            name="firstname"
            id="firstname"
            className="input rounded-xl "
            onChange={(e) => onChangeInputHandler(e)}
          />

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            value={information.data.email}
            name="email"
            id="email"
            className="input rounded-xl"
            onChange={(e) => onChangeInputHandler(e)}
          />
          <div className="my-1 flex flex-col items-center text-center">
            <label htmlFor="room">ผู้ดูแลระบบ</label>
            <input
              readOnly
              className=" bg-gray-300"
              type="checkbox"
              checked={information?.data?.isAdmin}
              name="room"
              id="room"
              disabled
            />
          </div>
        </div>

        <div className="flex flex-col ">
          <label htmlFor="lastname">นามสกุล</label>
          <input
            className="rounded-xl "
            type="text"
            value={information.data.lastname}
            name="lastname"
            id="lastname"
            onChange={(e) => onChangeInputHandler(e)}
          />

          <label htmlFor="tel">เบอร์โทรศัพท์</label>
          <input
            className="rounded-xl"
            type="tel"
            value={information.data.tel}
            name="tel"
            id="tel"
            onChange={(e) => onChangeInputHandler(e)}
          />
          <div className="my-1 flex flex-col items-center justify-center gap-y-1 text-center">
            <label htmlFor="tel">สีในปฏิฐิน</label>
            <input
              className="w-"
              type="color"
              value={information.data.color_calendar}
              name="color_calendar"
              id="tel"
              onChange={(e) => onChangeInputHandler(e)}
            />
          </div>
        </div>
      </div>
      <div className="mt-10 text-center">
        <button
          className="rounded-xl bg-green-300 px-4 py-2 text-white hover:bg-green-500"
          onClick={onSubmitHandler}
        >
          บันทึก
        </button>
      </div>
    </>
  );
};

export default TeacherInfo;
