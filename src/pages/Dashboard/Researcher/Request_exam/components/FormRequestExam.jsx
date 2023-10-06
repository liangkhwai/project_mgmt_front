import React, { Fragment, useEffect, useState } from "react";
import { AddButton } from "../../../../../UI/button";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import BoardList from "../../Group/components/BoardList";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import Body from "../../../../../UI/Body";
import Title from "../../../../../UI/Title";
const FormRequestExam = ({ groupInfo }) => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [boards, setBoards] = useState([]);
  const [leader, setLeader] = useState();
  const [examRequest, setExamRequest] = useState({
    type: "สอบหัวข้อ",
    des: "",
  });

  useEffect(() => {
    const fetchBoards = async () => {
      const res = await fetch(
        `http://localhost:8080/boards/get/${groupInfo.id}`,
        {
          method: "get",
        },
      );
      const data = await res.json();
      console.log(data);
      setBoards(data);
    };
    const fetchLeader = async () => {
      const res = await fetch(`http://localhost:8080/researcher/getOne`, {
        method: "get",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setLeader(data);
    };
    fetchBoards();
    fetchLeader();
  }, []);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setExamRequest((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (event) => {
    console.log(event);
    const files = event.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const requestExam = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch(
        "http://localhost:8080/requestExam/request",
        {
          method: "post",
          body: formData,
          credentials: "include",
        },
      );

      return response.json();
    },
    onSuccess: () => {
      Swal.fire({
        title: "ส่งขอยื่นสอบสำเร็จ",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/group");
    },
  });
  const submitHandler = () => {
    Swal.fire({
      title: "ยืนยันการส่งขอยื่นสอบ",
      text: "คุณต้องการส่งขอยื่นสอบหรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        if (selectedFiles.length === 0) {
          Swal.fire({
            title: "กรุณาแนบไฟล์เอกสาร PDF",
            icon: "warning",
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }

        const formData = new FormData();
        formData.append("category", resultTarget);
        formData.append("description", examRequest.des);
        formData.append("grpId", groupInfo.id);
        console.log(examRequest);
        console.log(selectedFiles);
        selectedFiles.forEach((file, index) => {
          formData.append("files", file, file.name);
        });
        for (const pair of formData.entries()) {
          console.log(`${pair[0]}, ${pair[1]}`);
        }
        requestExam.mutate(formData);
      }
    });
  };

  const target = groupInfo.status;
  let resultTarget;

  if (target === "ยังไม่ยื่นเสนอหัวข้อ") {
    return (
      <div className="mx-10">
        <Title>ขอยื่นสอบปริญญานิพนธ์</Title>

        <Body>
          <div>กรุณายื่นเสนอหัวข้อ{target}</div>
        </Body>
      </div>
    );
  } else if (target === "ยื่นเสนอหัวข้อ") {
    return (
      <div className="mx-10">
        <Title>ขอยื่นสอบปริญญานิพนธ์</Title>

        <Body>กรุณารอการอนุมัติหัวข้อ</Body>
      </div>
    );
  } else if (target === "ยังไม่ยื่นสอบหัวข้อ") {
    resultTarget = "สอบหัวข้อ";
  } else if (target === "สอบหัวข้อ") {
    resultTarget = "สอบหัวข้อ";
  } else if (target === "ยังไม่ยื่นสอบก้าวหน้า") {
    resultTarget = "สอบก้าวหน้า";
  } else if (target === "สอบก้าวหน้า") {
    resultTarget = "สอบก้าวหน้า";
  } else if (target === "ยังไม่ยื่นสอบป้องกัน") {
    resultTarget = "สอบป้องกัน";
  } else if (
    target === "สอบป้องกัน" ||
    target === "รอส่งปริญญานิพนธ์" ||
    target === "ส่งปริญญานิพนธ์แล้ว"
  ) {
    return (
      <div className="mx-10">
        <Title>ขอยื่นสอบปริญญานิพนธ์</Title>
        <Body>
          <div>
            คุณไม่สามารถยื่นสอบปริญญานิพนธ์ได้ เนื่องจากคุณได้สอบทุกขั้นตอนแล้ว
          </div>
        </Body>
      </div>
    );

    // } else if (target === "อนุมัติยื่นสอบก้าวหน้า") {
    //   resultTarget = "สอบป้องกัน";
    // } else if (target === "ปฏิเสธยื่นสอบก้าวหน้า") {
    //   resultTarget = "สอบก้าวหน้า";
    // } else if (target === "อนุมัติยื่นสอบป้องกัน") {
    //   resultTarget = "----------------";
    //   return (
    //     <div className="text-center text-xl   font-bold ">
    //       กลุ่มของคุณผ่านแล้ว กรุณายื่นไฟล์ปริญญานิพนธ์
    //     </div>
    //   );
    // } else if (target === "ปฏิเสธยื่นสอบป้องกัน") {
    //   resultTarget = "สอบป้องกัน";
  } else {
    return (
      <div className="text-center text-xl   font-bold ">กรุณา{target}</div>
    );
  }

  // const choiceTarget = ["ยังไม่ยื่นสอบหัวข้อ", "สอบหัวข้อ", ""];
  // let resultTarget = "";
  // choiceTarget.map((item, index) => {
  //   if (item === target) {
  //     console.log(item);
  //     resultTarget = choiceTarget[index + 1];
  //     console.log(resultTarget);
  //     if (resultTarget === undefined) {
  //       resultTarget = "----------------";
  //     }
  //     console.log(index);
  //   }
  // });
  const findRole = (role) => {
    if (role === "advisor") {
      return "อาจารย์ที่ปรึกษา";
    } else if (role === "board1") {
      return "ประธานกรรมการสอบ";
    } else {
      return "กรรมการสอบ";
    }
  };
  return (
    <Fragment>
      <div className="mx-10">
        <Title></Title>

        <Body>
          <div>
            <div className="my-5">
              <div id="header" className="my-3 mb-12">
                <div className="text-end">{dayjs().format("D/MM/YYYY")}</div>
                <h1 className="my-5 text-center text-2xl font-bold">
                  ใบแจ้งนัดหมายการสอบ
                </h1>

                <h1 className="my-5 text-center text-2xl font-bold">
                  สาขาวิชาระบบสารสนเทศ มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน
                  วิทยาเขตขอนแก่น
                </h1>
              </div>
              <section>
                <div className="my-5">
                  เรื่อง ขอแจ้งนัดหมายการสอบรายวิชา Senior Project
                </div>
                <div className="my-5">
                  เรียน อาจารย์ประจำวิชาโครงการวิจัยระดับปริญญาตรี
                </div>
              </section>

              <div className="mb-1">
                <label htmlFor="title" className="">
                  ชื่อหัวข้อ
                </label>
              </div>
              <input
                type="text"
                name=""
                id="title"
                value={groupInfo.title ? groupInfo.title : ""}
                className="w-full rounded-md"
                disabled
              />
            </div>
            <div className="w-full rounded-md border border-gray-700  text-center">
              <div className="flex flex-row justify-around py-5">
                {boards.map((item, idx) => (
                  <div key={item.id}>
                    <div>
                      {findRole(item.role)} {item.firstname} {item.lastname}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="my-5">
              กลุ่มข้าพเจ้าได้ดำเนินโครงการตามข้อกำหนดรายวิชา มีความคืบหน้า
              อยู่ในระดับที่มีความพร้อมที่จะขอสอบ
            </div>
            <div className="my-5">
              <div className="mb-1">
                <label htmlFor="type" className="">
                  ประเภทการขอสอบ
                </label>
              </div>
              <input
                type="text"
                name=""
                id=""
                disabled={true}
                className="w-full rounded-md px-2 py-2"
                value={resultTarget}
              />
            </div>
            <div className="my-5">
              <div className="mb-1">
                <label htmlFor="des" className="">
                  รายละเอียด
                </label>
              </div>

              <textarea
                className="w-full rounded-md px-2 py-2"
                rows=""
                cols=""
                id="des"
                name="des"
                onChange={(e) => inputChangeHandler(e)}
              ></textarea>
            </div>
            <div className="my-5">
              <div className="mb-1">
                <label htmlFor="file" className="">
                  แนบเอกสารขอสอบ
                </label>
              </div>
              <input
                type="file"
                name="files"
                id="file"
                multiple
                className="w-full"
                onChange={(e) => handleFileChange(e)}
                multipleaccept=".pdf"
                accept=".pdf"
              />
            </div>
          </div>

          <div className="text-center">
            <AddButton
              onClick={() => {
                submitHandler();
              }}
            >
              ขอสอบ
            </AddButton>
          </div>
        </Body>
      </div>
    </Fragment>
  );
};

export default FormRequestExam;
