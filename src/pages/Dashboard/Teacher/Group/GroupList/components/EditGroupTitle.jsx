import React, { useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const EditGroupTitle = (props) => {
  const [titleInputHandler, setTitleInputHandler] = useState(props.title);
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(props.title);
  const { grpId } = useParams();

  const mutation = useMutation({
    mutationFn: async (titleInputHandler) => {
      const reponse = await fetch(
        "http://localhost:8080/group/changeGroupTitle",
        {
          method: "put",
          body: JSON.stringify({ groupId: grpId, title: titleInputHandler }),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );
    },
    onSuccess: () => {
      setTitle(titleInputHandler);
      setIsEditing(!isEditing);
      Swal.fire({
        icon: "success",
        title: "แก้ไขสำเร็จ",
        text: "แก้ไขข้อมูลสำเร็จ",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถแก้ไขได้",
        text: "กรุณาลองใหม่อีกครั้ง",
      });
    },
  });

  const clickSubmitFormHandler = () => {
    console.log(grpId);
    Swal.fire({
      title: "แก้ไขข้อมูล?",
      text: "คุณต้องการแก้ไขข้อมูลชื่อหัวข้อหรือไม่!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "แก้ไข!",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(titleInputHandler);
      }
    });
  };

  const inputChangeHandler = (value) => {
    setTitleInputHandler(value);
  };

  const sendUpdateInComplete = async () => {
    Swal.fire({
      title: "ติด I ทั้งกลุ่ม?",
      text: "คุณต้องการติด I ให้นักวิจัยกลุ่มนี้หรือไม่!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ติด!",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          "http://localhost:8080/group/updateInCompleteGroup",
          {
            method: "post",
            body: JSON.stringify({ grpId: grpId }),
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "แก้ไขสำเร็จ",
            text: "แก้ไขข้อมูลสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <div>
      {isEditing ? (
        <div className="flex items-center">
          <div className="mr-2 text-xl">ชื่อหัวข้อ</div>
          <input
            className="text-xl focus:bg-blue-50"
            type="text"
            name=""
            id=""
            value={titleInputHandler}
            onChange={(e) => inputChangeHandler(e.target.value)}
          />
          <button
            className="mx-3 rounded-full  bg-white px-4  py-1 text-sm  text-blue-800 shadow-md "
            onClick={() => clickSubmitFormHandler()}
          >
            ยืนยัน
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center ">
              <div className="text-xl">ชื่อหัวข้อ : {title} </div>
              <button
                className="mx-3 rounded-full  bg-white px-4  py-1 text-sm  text-blue-800 shadow-md"
                onClick={() => setIsEditing(!isEditing)}
              >
                แก้ไข
              </button>
            </div>
          </div>
          <div>
            <button
              className="rounded-xl bg-gray-400 px-4 py-2 text-white"
              onClick={sendUpdateInComplete}
            >
              ติด I ผู้วิจัย
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditGroupTitle;
