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
              <div className="rounded-md bg-white p-5 shadow-lg border">
                <div
                  className="flex justify-between"
                  onClick={() =>
                    window.open(
                      "http://127.0.0.1:8080/files/upload/" + item.originalname,
                      "_blank",
                    )
                  }
                >
                  <div className="cursor-pointer text-xl text-light-blue-700">
                    {item.originalname}
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-end gap-3 text-end">
                  <button
                    className="rounded-md bg-red-500 px-5 py-2 text-white"
                    onClick={() => removeFileList(item.id)}
                  >
                    ลบ
                  </button>
                  <button
                    className="rounded-md bg-blue-500 px-5 py-2 text-white"
                    onClick={() =>
                      window.open(
                        "http://127.0.0.1:8080/files/upload/" +
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
