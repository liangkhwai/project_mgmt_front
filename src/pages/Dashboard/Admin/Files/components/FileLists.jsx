import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const FileLists = ({ fileLists, removeFileList }) => {
  return (
    <div>
      {fileLists.length > 0 ? (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {fileLists.map((item, idx) => (
            <Fragment key={idx}>
              <div className="rounded-md bg-white p-5 shadow-md">
                <div className="flex justify-between">
                  <div className="text-xl">{item.originalname}</div>
                  <div
                    className="cursor-pointer text-red-500"
                    onClick={() => removeFileList(item.id)}
                  >
                    ลบ
                  </div>
                </div>
                <div className="text-gray-500">{item.description}</div>
                <div className="mt-5 text-end">
                  <button
                    className="rounded-md bg-blue-500 px-5 py-2 text-white"
                    onClick={() =>
                      window.open(
                        "http://localhost:8080/files/upload/" +
                          item.originalname,
                        "_blank",
                      )
                    }
                  >
                    ดู
                  </button>
                 
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="my-5 rounded-xl border border-black p-5 text-center text-xl font-bold">
          ไม่มีไฟล์เอกสาร
        </div>
      )}
    </div>
  );
};

export default FileLists;
