import React, { useState } from "react";
import Title from "../../../../UI/Title";
import Body from "../../../../UI/Body";
import { useMutation, useQuery } from "react-query";
import FileList from "./components/FileList";
import { useEffect } from "react";
import { useRef } from "react";
import FileLists from "./components/FileLists";
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
    },
  });

  useEffect(() => {
    console.log(selectedFiles);
  }, [selectedFiles]);

  const uploadFileHandler = () => {
    if (window.confirm("Are you sure upload these files")) {
      const formData = new FormData();
      console.log(selectedFiles);
      selectedFiles.forEach((file, index) => {
        console.log(file);
        formData.append("files", file);
      });
      filesUpload.mutate(formData);
    } else {
      return;
    }
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
    if (window.confirm("Are you sure delete this file")) {
      fileDelete.mutate(id);
    } else {
      return;
    }


    
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
            className="my-2 bg-gray-300 w-full"
          />
        </div>
        <FileList files={selectedFiles} removeFile={removeSelectedFile} />
        <div className="text-end mt-5">
          <button
            onClick={uploadFileHandler}
            className="px-4 py-2 bg-green-500"
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
