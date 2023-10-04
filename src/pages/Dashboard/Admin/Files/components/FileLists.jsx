import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const FileLists = ({ fileLists, removeFileList }) => {
  return (
    <div>
      
      {fileLists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {fileLists.map((item, idx) => (
            <Fragment key={idx}>
              <div className="bg-white shadow-md rounded-md p-5">
                <div className="flex justify-between">
                  <div className="text-xl">{item.name}</div>
                  <div
                    className="text-red-500 cursor-pointer"
                    onClick={() => removeFileList(item.id)}
                  >
                    ลบ
                  </div>
                </div>
                <div className="text-gray-500">{item.description}</div>
                <div className="flex justify-between mt-5">
                  <Link
                    to={`/dashboard/admin/files/${item.id}`}
                    className="bg-blue-500 text-white px-5 py-2 rounded-md"
                  >
                    ดู
                  </Link>
                  <a
                    href={item.file}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-500 text-white px-5 py-2 rounded-md"
                  >
                    ดาวน์โหลด
                  </a>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="text-center font-bold text-xl p-5 border rounded-xl my-5 border-black">ไม่มีไฟล์เอกสาร</div>
      )}

    </div>
  );
};

export default FileLists;
