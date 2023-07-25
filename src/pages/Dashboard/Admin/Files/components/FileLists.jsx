import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const FileLists = ({ fileLists, removeFileList }) => {
  return (
    <div>
      {fileLists.map((item, idx) => {
        return (
          <Fragment key={idx}>
            <div className="flex justify-between items-center my-1 ">
              <Link
                target="_blank"
                to={`http://localhost:8080/files/upload/${item.originalname}`}
              >
                <div className="text-blue-500 bg-gray-300 hover:bg-light-blue-200 hover:text-white transition-colors delay-100 px-2 py-1 rounded-md ease-in-out">{item.originalname}</div>
              </Link>
              <div>
                <button
                  className="bg-red-300 px-4 py-2"
                  onClick={() => removeFileList(item.id)}
                >
                  ลบ
                </button>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default FileLists;
