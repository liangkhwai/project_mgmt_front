import React from "react";

const FileItem = ({ file, deleteFile }) => {
  return (
    <>
      <li className="flex items-center justify-between bg-light-blue-300" key={file.name}>
        <p>{file.name}</p>
        <div className="actions">
          {file.isUploading && (
            <div className="fa-spin" onClick={() => deleteFile(file.name)}>
              Loading...
            </div>
          )}
          {!file.isUploading && (
            <button className="bg-red-400 px-4 py-2" onClick={() => deleteFile(file.name)}>ลบ</button>
          )}
        </div>
      </li>
    </>
  );
};

export default FileItem;
