import React from "react";
import FileItem from "../components/FileItem";

const FileList = ({ files, removeFile }) => {
  const deleteFileHandler = (event) => {
    console.log(event);
    removeFile(event);
  };
  return (
    <ul className="file-list">
      {files &&
        files.map((f,i) => (
          <FileItem key={i} file={f} deleteFile={deleteFileHandler} />
        ))}
    </ul>
  );
};

export default FileList;
