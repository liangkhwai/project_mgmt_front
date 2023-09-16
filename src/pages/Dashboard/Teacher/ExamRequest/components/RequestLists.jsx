import React, { Fragment } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import DropdownFiles from "./DropdownFiles";

const RequestLists = ({ requestList, setRequestData, isLoading }) => {
  const approveHandler = useMutation({
    mutationFn: async ({ isApprove, categories, item }) => {
      console.log(isApprove, categories, item);

      const response = await fetch(
        "http://localhost:8080/requestExam/setStatus",
        {
          method: "post",
          body: JSON.stringify({
            isApprove: isApprove,
            categories: categories,
            item: item,
          }),
          // credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.json();
    },
    onSuccess: (data) => {
      console.log(data);
      setRequestData((prev) => {
        const index = prev.findIndex((item) => item.id === data.id);

        if (index !== -1) {
          const updatedItem = { ...data };

          const updatedState = [...prev];
          updatedState[index] = updatedItem;
          console.log(prev[index]);
          console.log(updatedState[index]);
          return updatedState;
        }

        // If the item with the given ID is not found, return the previous state unchanged
        return prev;
      });
    },
  });

  const submitHandler = (isApprove, categories,item) => {
    console.log(isApprove, categories, item);
    approveHandler.mutate({ isApprove, categories, item });
  };

  return (
    <div>
      <div className="text-center font-bold text-xl py-5 ">การขอสอบล่าสุด</div>
      <div className="grid grid-cols-7 py-1 text-center content-center ">
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
          ไฟล์
        </div>
        <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
          อนุมัติ
        </div>
        <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
          ไม่อนุมัติ
        </div>
      </div>
      {isLoading ? (
        <Fragment>
          {requestList.length <= 0 ? (
            <div className="col-span-7 text-center text-xl py-2 border  ">
              ยังไม่มีรายการขอสอบ ณ ขณะนี้
            </div>
          ) : (
            <Fragment>
              {requestList.map((item, idx) => {
                return (
                  <Fragment key={item.id}>
                    <div
                      className="grid grid-cols-7 py-1 text-center content-center "
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
                        <textarea
                          rows=""
                          cols=""
                          disabled
                          value={item.description}
                          className="p-1 bg-gray-100 rounded-xl"
                        ></textarea>
                      </div>
                      <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
                        <DropdownFiles files={item.files} />
                      </div>
                      <div className="w-full bg-gray-200 flex items-center py- justify-center">
                        <button
                          className="px-4 py-1 bg-green-400 rounded-md"
                          onClick={() =>
                            submitHandler(true, item.categories, item)
                          }
                        >
                          อนุมัติ
                        </button>
                      </div>
                      <div className="w-full bg-gray-200 flex items-center py-4 justify-center">
                        <button
                          className="px-4 py-1 bg-red-200 rounded-md"
                          onClick={() =>
                            submitHandler(false, item.categories, item)
                          }
                        >
                          ไม่อนุมัติ
                        </button>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </Fragment>
          )}
        </Fragment>
      ) : (
        "Loading ...."
      )}
    </div>
  );
};

export default RequestLists;
