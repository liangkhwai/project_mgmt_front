import React from "react";
import Swal from "sweetalert2";
const ResearcherInfo = ({ information, setinformation }) => {
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
        await fetch("http://34.124.162.203:8080/researcher/update", {
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
            disabled
            className="input rounded-xl bg-gray-300"
          />

          <label htmlFor="email">รหัสนักศึกษา</label>
          <input
            type="email"
            value={information.data.student_id}
            name="email"
            id="email"
            className="input rounded-xl bg-gray-300"
            disabled
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

          <label htmlFor="room">ห้อง</label>
          <input
            className="rounded-xl bg-gray-300"
            type="text"
            value={information?.data?.categorie_room?.room}
            name="room"
            id="room"
            disabled
          />

          <label htmlFor="grade_project">เกรดโปรเจค</label>
          <input
            type="number"
            value={information?.data?.grade_project}
            name="grade_project"
            id="grade_project"
            disabled
            className="rounded-xl bg-gray-300"
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="lastname">นามสกุล</label>
          <input
            className="rounded-xl bg-gray-300"
            type="text"
            value={information.data.lastname}
            name="lastname"
            id="lastname"
            disabled
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

          <label htmlFor="grade">เกรดเฉลี่ย</label>
          <input
            className="rounded-xl"
            type="number"
            value={information.data.grade}
            name="grade"
            id="grade"
            onChange={(e) => onChangeInputHandler(e)}
          />
          <label>สถานะ</label>
          <div className="flex justify-around rounded-xl border border-gray-700 bg-gray-300 py-0.5">
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="grade">ติด I</label>
              <input type="checkbox" checked={information.data.isLate} disabled />
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="grade">รอลงทะเบียน</label>
              <input
                type="checkbox"
                checked={information.data.waitRegister}
                disabled
              />
            </div>
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

export default ResearcherInfo;
