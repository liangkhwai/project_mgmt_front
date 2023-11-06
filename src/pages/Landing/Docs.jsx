import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
const Docs = () => {
  const [files, setFiles] = useState([]);
  const { data } = useQuery({
    queryFn: async () => {
      const response = await fetch("http://34.124.162.203:8080/files/list", {
        method: "get",
      });
      return response.json();
    },
  });
  useEffect(() => {
    if (data) {
        console.log(data);
      setFiles(data);
    }
  }, [data]);

  return (
    <div className="bg-blue-50 flex flex-col justify-normal h-screen">
      <div className="mx-44">
        <div className="text-4xl my-10 text-blue-800 font-semibold">เอกสาร</div>
        <div className="pl-3 pb-2 font-semibold text-blue-800">ชื่อเอกสาร</div>
        {files.map((item, idx) => {
          return (
            <div key={idx} className="bg-white p-10 mb-20 border rounded-xl ">
                <div className="text-blue-600">

                <Link target="_blank" to={`http://34.124.162.203:8080/files/upload/${item.originalname}`}>{item.originalname}</Link>
              
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Docs;
