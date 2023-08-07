import React, { Fragment, useEffect, useState } from "react";
import { AddButton } from "../../../../../UI/button";
import { useMutation } from "react-query";
const FormRequestExam = ({ groupInfo }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [examRequest, setExamRequest] = useState({
    type: "สอบหัวข้อ",
    des: "",
  });

  useEffect(() => {
    console.log(examRequest);
  }, [examRequest]);

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

  return (
    <Fragment>
      <div>
        <div className="my-5">
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
        <div className="my-5">
          <div className="mb-1">
            <label htmlFor="type" className="font-bold">
              ประเภทการขอสอบ
            </label>
          </div>

          <select
            className="w-full rounded-md py-2 px-2"
            name="type"
            id="type"
            onChange={(e) => inputChangeHandler(e)}
          >
            <option value="สอบหัวข้อ">สอบหัวข้อ</option>
            <option value="สอบก้าวหน้า">สอบก้าวหน้า</option>
            <option value="สอบป้องกัน">สอบป้องกัน</option>
          </select>
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
