import React, { Fragment, useEffect, useState } from "react";
import { AddButton } from "../../../../../UI/button";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import BoardList from "../../Group/components/BoardList";
const FormRequestExam = ({ groupInfo }) => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [boards, setBoards] = useState([]);
  const [examRequest, setExamRequest] = useState({
    type: "สอบหัวข้อ",
    des: "",
  });

  useEffect(() => {
    console.log(examRequest);
  }, [examRequest]);

  useEffect(() => {
    const fetchBoards = async () => {
      const res = await fetch(
        `http://localhost:8080/boards/get/${groupInfo.id}`,
        {
          method: "get",
        }
      );
      const data = await res.json();
      console.log(data);
      setBoards(data);
    };
    fetchBoards();
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
        }
      );

      return response.json();
    },
    onSuccess: () => {
      navigate("/dashboard/group");
    },
  });
  const submitHandler = () => {
    const formData = new FormData();
    formData.append("category", examRequest.type);
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
  };

  const target = groupInfo.status;
  // const target = "รออนุมัติยื่นสอบหัวข้อ";
  let resultTarget;

  if (target === "ยังไม่ยื่นสอบหัวข้อ") {
    resultTarget = "สอบหัวข้อ";
  } else if (target === "อนุมัติยื่นสอบหัวข้อ") {
    resultTarget = "สอบก้าวหน้า";
  } else if (target === "ปฏิเสธยื่นสอบหัวข้อ") {
    resultTarget = "สอบหัวข้อ";
  } else if (target === "อนุมัติยื่นสอบก้าวหน้า") {
    resultTarget = "สอบป้องกัน";
  } else if (target === "ปฏิเสธยื่นสอบก้าวหน้า") {
    resultTarget = "สอบก้าวหน้า";
  } else if (target === "อนุมัติยื่นสอบป้องกัน") {
    resultTarget = "----------------";
    return (
      <div className="text-center text-xl   font-bold ">
        กลุ่มของคุณผ่านแล้ว กรุณายื่นไฟล์ปริญญานิพนธ์
      </div>
    );
  } else if (target === "ปฏิเสธยื่นสอบป้องกัน") {
    resultTarget = "สอบป้องกัน";
  } else {
    return (
      <div className="text-center text-xl   font-bold ">{target}จากอาจารย์</div>
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

  return (
    <Fragment>
      <div>
        <div className="my-5">
          <div id="header" className="my-3">
            <h1 className="text-center text-xl font-bold">
              ใบแจ้งนัดหมายการสอบ
            </h1>
            <h1 className="text-center text-xl font-bold">
              รายวิชา 32-406-081-405 Senior Project
            </h1>
            <h1 className="text-center text-xl font-bold">
              สาขาวิชาระบบสารสนเทศ มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน
              วิทยาเขตขอนแก่น
            </h1>
          </div>
        <div>
          เรื่อง ขอแจ้งนัดหมายการสอบรายวิชา 32-406-081-405 Senior Project ประจำภาคการศึกษาที่ 2/2564
        </div>

          
          <div className="mb-1">
            <label htmlFor="title" className="font-bold">
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
        <div className="w-full text-center border rounded-md  border-gray-700">
          <div className="grid grid-cols-3 ">
            <div></div>
            <div className="border">
              <BoardList boards={boards} />
            </div>

            <div></div>
          </div>
        </div>

        <div className="my-5">
          <div className="mb-1">
            <label htmlFor="type" className="font-bold">
              ประเภทการขอสอบ
            </label>
          </div>
          <input
            type="text"
            name=""
            id=""
            disabled={true}
            className="w-full rounded-md py-2 px-2"
            value={resultTarget}
          />
          {/* <select
            className="w-full rounded-md py-2 px-2"
            name="type"
            id="type"
            onChange={(e) => inputChangeHandler(e)}
          >
            <option value="สอบหัวข้อ">สอบหัวข้อ</option>
            <option value="สอบก้าวหน้า">สอบก้าวหน้า</option>
            <option value="สอบป้องกัน">สอบป้องกัน</option>
          </select> */}
        </div>
        <div className="my-5">
          <div className="mb-1">
            <label htmlFor="des" className="font-bold">
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
            <label htmlFor="file" className="font-bold">
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
    </Fragment>
  );
};

export default FormRequestExam;
