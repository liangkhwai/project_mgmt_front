import React, { Fragment } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import DropdownFiles from "./DropdownFiles";
import Swal from "sweetalert2";
import dayjs from "dayjs";

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
        },
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

  const submitHandler = (isApprove, categories, item) => {
    console.log(isApprove, categories, item);

    Swal.fire({
      title: "คุณต้องการอนุมัติหรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่ใช่",
    }).then((result) => {
      if (result.isConfirmed) {
        approveHandler.mutate({ isApprove, categories, item });
        Swal.fire("อนุมัติสำเร็จ!", "", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("ยกเลิก", "", "error");
      }
    });

    // approveHandler.mutate({ isApprove, categories, item });
  };

  return (
    <div>
      <div className="py-5 text-center text-xl font-bold ">การขอสอบล่าสุด</div>
      <div className="grid grid-cols-8 content-center py-1 text-center ">
        <div className="flex w-full items-center justify-center bg-gray-200 py-4">
          ชื่อหัวข้อ
        </div>
        <div className="flex w-full items-center justify-center bg-gray-200 py-4">
          ประเภทหัวข้อ
        </div>
        <div className="flex w-full items-center justify-center bg-gray-200 py-4">
          สถานะ
        </div>

        <div className="flex w-full items-center justify-center bg-gray-200 py-4">
          รายละเอียด
        </div>
        <div className="flex w-full items-center justify-center bg-gray-200 py-4">
          ไฟล์
        </div>
        <div className="flex w-full items-center justify-center bg-gray-200 py-4">
          เวลาที่ยื่น
        </div>
        <div className="flex w-full items-center justify-center bg-gray-200 py-4">
          อนุมัติ
        </div>
        <div className="flex w-full items-center justify-center bg-gray-200 py-4">
          ไม่อนุมัติ
        </div>
      </div>
      {isLoading ? (
        <Fragment>
          {requestList.length <= 0 ? (
            <div className="col-span-7 border py-2 text-center text-xl  ">
              ยังไม่มีรายการขอสอบ ณ ขณะนี้
            </div>
          ) : (
            <Fragment>
              {requestList.map((item, idx) => {
                return (
                  <Fragment key={item.id}>
                    <div
                      className="grid grid-cols-8 content-center py-1 text-center "
                      key={item.id}
                    >
                      <div className="flex w-full items-center justify-center bg-gray-200 py-4">
                        {item.title}
                      </div>
                      <div className="flex w-full items-center justify-center bg-gray-200 py-4">
                        {item.categories}
                      </div>
                      <div className="flex w-full items-center justify-center bg-gray-200 py-4">
                        {item.status}
                      </div>
                      <div className="flex w-full items-center justify-center bg-gray-200 py-4">
                        <textarea
                          disabled
                          value={item.description}
                          className="w-full rounded-xl bg-gray-100"
                        ></textarea>
                      </div>
                      <div className="flex w-full items-center justify-center bg-gray-200 py-4">
                        <DropdownFiles files={item.files} />
                      </div>
                      <div className="flex w-full items-center justify-center bg-gray-200 py-4">
                        {dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}
                      </div>
                      <div className="py- flex w-full items-center justify-center bg-gray-200">
                        <button
                          className="rounded-md bg-green-400 px-4 py-1"
                          onClick={() =>
                            submitHandler(true, item.categories, item)
                          }
                        >
                          อนุมัติ
                        </button>
                      </div>
                      <div className="flex w-full items-center justify-center bg-gray-200 py-4">
                        <button
                          className="rounded-md bg-red-200 px-4 py-1"
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
