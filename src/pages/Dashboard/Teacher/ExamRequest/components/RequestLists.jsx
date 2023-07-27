import React, { Fragment } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";

const RequestLists = ({ requestList }) => {
  const approveHandler = useMutation({
    mutationFn: async ({ isApprove, categories, id }) => {
      console.log(isApprove, categories, id);

      const response = await fetch(
        "http://localhost:8080/requestExam/setStatus",
        {
          method: "post",
          body: JSON.stringify({
            isApprove: isApprove,
            categories: categories,
            id: id,
          }),
          // credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.json();
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const submitHandler = (isApprove, categories, id) => {
    console.log(isApprove, categories, id);
    approveHandler.mutate({ isApprove, categories, id });
  };

  return (
    <div>
      <div className="text-center font-bold text-xl py-5 ">การขอสอบล่าสุด</div>
      <div className="grid grid-cols-6 py-1 text-center content-center ">
        <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
          ชื่อหัวข้อ
        </div>
        <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
          ประเภทหัวข้อ
        </div>
        <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
          สถานะ
        </div>
        <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
          รายละเอียด
        </div>
        <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
          อนุมัติ
        </div>
        <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
          ไม่อนุมัติ
        </div>
      </div>
      {requestList.map((item, idx) => {
        return (
          <Fragment>
            <div
              className="grid grid-cols-6 py-1 text-center content-center "
              key={item.id}
            >
              <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
                {item.title}
              </div>
              <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
                {item.categories}
              </div>
              <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
                {item.status}
              </div>
              <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
                {item.description}
              </div>
              <div className="w-full bg-gray-200 flex items-center py- justify-center">
                <button
                  className="px-4 py-1 bg-green-400 rounded-md"
                  onClick={() => submitHandler(true, item.categories, item.id)}
                >
                  อนุมัติ
                </button>
              </div>
              <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
                <button
                  className="px-4 py-1 bg-red-200 rounded-md"
                  onClick={() => submitHandler(false, item.categories, item.id)}
                >
                  ไม่อนุมัติ
                </button>
              </div>
              {item.files && (
                <ul className="list-disc col-span-6 list-inside">
                  {item.files.map((item) => {
                    return (
                      <li className="p-2  py-2 text-start">
                        <Link
                          className="bg-light-blue-200 p-2 rounded-md"
                          target="_blank"
                          to={`http://localhost:8080/files/request/${item.originalname}`}
                        >
                          {item.originalname}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default RequestLists;
