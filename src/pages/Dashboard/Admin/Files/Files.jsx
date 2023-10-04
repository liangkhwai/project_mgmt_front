import React, { useState } from "react";
import Title from "../../../../UI/Title";
import Body from "../../../../UI/Body";
import { useMutation, useQuery } from "react-query";
import FileList from "./components/FileList";
import { useEffect } from "react";
import { useRef } from "react";
import FileLists from "./components/FileLists";
import Swal from "sweetalert2";
const Files = () => {
  const [fileLists, setFileLists] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const inputRef = useRef();
  const handleFileChange = (event) => {
    console.log(event);
    const files = event.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const { data } = useQuery({
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/files/list", {
        method: "get",
        credentials: "include",
      });
      return response.json();
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setFileLists(data);
    }
  }, [data]);

  const filesUpload = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch("http://localhost:8080/files/fileUplaod", {
        method: "post",
        body: formData,
        credentials: "include",
        // headers:{"Content-Type":"multipart/form-data"}
      });

      return response.json();
    },
    onSuccess: (data) => {
      console.log(data);
      setFileLists((prev) => [...prev, ...data]);
      setSelectedFiles([]);
      inputRef.current.value = null;
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "อัพโหลดไฟล์สำเร็จ!",
      });
    },
    onError: (error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "เกิดข้อผิดพลาด!",
      });
    },
  });
  const fileDelete = useMutation({
    mutationFn: async (id) => {
      const response = await fetch("http://localhost:8080/files/delete", {
        method: "post",
        body: JSON.stringify({ id: id }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      return response.json();
    },
    onSuccess: (data) => {
      const filterFileLists = fileLists.filter(
        (item, idx) => item.id !== parseInt(data)
      );
      setFileLists(filterFileLists);
      Swal.fire({
        icon: "success",
        title: "สำเร็จ!",
        text: "ลบไฟล์สำเร็จ!",
      });
    },
    onError: (error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "เกิดข้อผิดพลาด!",
      });
    },
  });

  useEffect(() => {
    console.log(selectedFiles);
  }, [selectedFiles]);

  const uploadFileHandler = () => {
    Swal.fire({
      title: "เพิ่มเอกสาร?",
      text: "คุณต้องการเพิ่มเอกสารหรือไม่!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "เพิ่ม!",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        console.log(selectedFiles);
        selectedFiles.forEach((file, index) => {
          console.log(file);
          formData.append("files", file);
        });

        if (selectedFiles.length === 0) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "กรุณาเพิ่มไฟล์เอกสาร!",
            timer: 2000,
            timerProgressBar: true,
          });
          return;
        }
        filesUpload.mutate(formData);
      }
    });
  };
  const removeSelectedFile = (event) => {
    console.log(inputRef.current);
    console.log(event);
    inputRef.current.value = null;
    const filterFiles = selectedFiles.filter(
      (item, idx) => item.name !== event
    );

    console.log(filterFiles);
    setSelectedFiles(filterFiles);
  };

  const removeFileList = (id) => {
    Swal.fire({
      title: "ลบไฟล์?",
      text: "คุณต้องการลบไฟล์นี้ใช่หรือไม่!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบ!",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        fileDelete.mutate(id);
      }
    });
  };

  return (
    <div className="mx-10">
      <Title>อัพโหลดไฟล์เอกสาร</Title>
      <Body>
        <div className="my-10">
          <div className="text-xl">รายการเอกสาร</div>
          <FileLists fileLists={fileLists} removeFileList={removeFileList} />
        </div>

        <div className="">
          <input
            ref={inputRef}
            type="file"
            name="files"
            id=""
            multiple
            onChange={(e) => handleFileChange(e)}
            className="my-2 w-full bg-gray-300"
            accept="application/pdf"
          />
        </div>
        <FileList files={selectedFiles} removeFile={removeSelectedFile} />
        <div className="mt-5 text-end">
          <button
            onClick={uploadFileHandler}
            className="bg-green-500 px-4 py-2"
          >
            {" "}
            Upload
          </button>
        </div>
      </Body>
    </div>
  );
};

export default Files;
